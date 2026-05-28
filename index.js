require("dotenv").config();
const express = require("express");
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  Events
} = require("discord.js");
const { Pool } = require("pg");
const raids = require("./raids");

const EXTENSION_COLORS = {
  Vanilla: 0x8B4513,
  BC: 0x2ecc71,
  WOTLK: 0x3498db
};

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ================= DATABASE INIT =================
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS progression (
      raid TEXT,
      boss TEXT,
      status INTEGER,
      messageId TEXT,
      PRIMARY KEY (raid, boss)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  console.log("✅ PostgreSQL connecté.");
})();

// ================= SECURITY =================
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// ================= HELPERS =================
async function hasPermission(member) {

  const result = await pool.query(
    "SELECT value FROM config WHERE key = $1",
    ["roleId"]
  );

  const row = result.rows[0];

  if (!row) {
    return member.permissions.has(
      PermissionsBitField.Flags.Administrator
    );
  }

  return (
    member.roles.cache.has(row.value) ||
    member.permissions.has(PermissionsBitField.Flags.Administrator)
  );
}

function getExpansion(raidName) {
  if (raidName.includes("Vanilla")) return "Vanilla";
  if (raidName.includes("BC")) return "BC";
  if (raidName.includes("WOTLK")) return "WOTLK";
  return null;
}

async function buildEmbed(raidName) {

  const result = await pool.query(
    "SELECT * FROM progression WHERE raid = $1",
    [raidName]
  );

  const rows = result.rows;

  const bosses = raids[raidName];
  let done = 0;

  const description = bosses
    .map((boss) => {
      const row = rows.find((r) => r.boss === boss);
      const isDown = Number(row?.status) === 1;

      if (isDown) done++;

      const icon = isDown ? "🟢" : "🔴";
      return `${icon} ${boss}`;
    })
    .join("\n");

  const extension = getExpansion(raidName);

  return new EmbedBuilder()
    .setTitle(`🏰 ${raidName}`)
    .setDescription(description)
    .addFields({
      name: "📊 Progression du raid",
      value: `**${done} / ${bosses.length} boss down**`
    })
    .setColor(EXTENSION_COLORS[extension] || 0xffffff)
    .setFooter({ text: `Extension : ${extension}` })
    .setTimestamp();
}

async function buildGlobalSummary() {

  const result = await pool.query("SELECT * FROM progression");
  const rows = result.rows;

  const summary = {
    Vanilla: { done: 0, total: 0 },
    BC: { done: 0, total: 0 },
    WOTLK: { done: 0, total: 0 }
  };

  for (const row of rows) {
    const ext = getExpansion(row.raid);
    if (!ext) continue;

    summary[ext].total++;
    if (Number(row.status) === 1) {
      summary[ext].done++;
    }
  }

  return new EmbedBuilder()
    .setTitle("📜 Résumé des extensions")
    .setDescription(
      `Vanilla : ${summary.Vanilla.done} / ${summary.Vanilla.total}\n` +
      `BC : ${summary.BC.done} / ${summary.BC.total}\n` +
      `WOTLK : ${summary.WOTLK.done} / ${summary.WOTLK.total}`
    )
    .setColor(0xf1c40f)
    .setTimestamp();
}


// ================= COMMANDS =================
const commands = [
  new SlashCommandBuilder()
    .setName("setup-progress")
    .setDescription("Créer tous les embeds de progression"),

  new SlashCommandBuilder()
    .setName("down")
    .setDescription("Cocher un boss")
    .addStringOption(option =>
      option.setName("raid")
        .setDescription("Raid")
        .setRequired(true)
        .setAutocomplete(true))
    .addStringOption(option =>
      option.setName("boss")
        .setDescription("Boss")
        .setRequired(true)
        .setAutocomplete(true)),

  new SlashCommandBuilder()
    .setName("undown")
    .setDescription("Décocher un boss")
    .addStringOption(option =>
      option.setName("raid")
        .setDescription("Raid")
        .setRequired(true)
        .setAutocomplete(true))
    .addStringOption(option =>
      option.setName("boss")
        .setDescription("Boss")
        .setRequired(true)
        .setAutocomplete(true)),

  new SlashCommandBuilder()
    .setName("setrole")
    .setDescription("Définir le rôle autorisé")
    .addRoleOption(option =>
      option.setName("role")
        .setDescription("Rôle autorisé")
        .setRequired(true))
].map(cmd => cmd.toJSON());

// ================= REGISTER =================
client.once(Events.ClientReady, async () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  );

  console.log("✅ Commandes enregistrées.");
});

// ================= AUTOCOMPLETE =================
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isAutocomplete()) return;

  try {
    const focused = interaction.options.getFocused(true);

    // ✅ Autocomplete RAID
    if (focused.name === "raid") {

      const filtered = Object.keys(raids)
        .filter(r =>
          r.toLowerCase().includes(focused.value.toLowerCase())
        )
        .slice(0, 25);

      return await interaction.respond(
        filtered.map(r => ({ name: r, value: r }))
      );
    }

    // ✅ Autocomplete BOSS
    if (focused.name === "boss") {

      const raidName = interaction.options.getString("raid");

      if (!raidName || !raids[raidName]) {
        return await interaction.respond([]);
      }

      const filtered = raids[raidName]
        .filter(b =>
          b.toLowerCase().includes(focused.value.toLowerCase())
        )
        .slice(0, 25);

      return await interaction.respond(
        filtered.map(b => ({ name: b, value: b }))
      );
    }

    return await interaction.respond([]);

  } catch (error) {
    console.error("AUTOCOMPLETE ERROR:", error);
    try {
      await interaction.respond([]);
    } catch {}
  }
});

// ================= COMMAND HANDLER =================
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  await interaction.deferReply({ ephemeral: true });

  try {
    const { commandName } = interaction;
    const member = interaction.member;

    if (!member) {
      return interaction.editReply("❌ Impossible de vérifier les permissions.");
    }

    if (!(await hasPermission(member))) {
      return interaction.editReply("❌ Permission refusée.");
    }

    // ================= SETUP =================
   // ================= SETUP =================
if (commandName === "setup-progress") {

  const channel = interaction.channel;

  for (const raidName of Object.keys(raids)) {

    const bosses = raids[raidName];

    for (const boss of bosses) {
      await pool.query(
        `INSERT INTO progression (raid, boss, status)
         VALUES ($1, $2, 0)
         ON CONFLICT (raid, boss) DO NOTHING`,
        [raidName, boss]
      );
    }

    const embed = await buildEmbed(raidName);
    const message = await channel.send({ embeds: [embed] });

    await pool.query(
      "UPDATE progression SET messageId = $1 WHERE raid = $2",
      [message.id, raidName]
    );
  }

  const globalEmbed = await buildGlobalSummary();
  await channel.send({ embeds: [globalEmbed] });

  return interaction.editReply("✅ Tous les embeds ont été créés.");
}

    // ================= DOWN / UNDOWN =================
   if (commandName === "down" || commandName === "undown") {

  const raidName = interaction.options.getString("raid");
  const bossName = interaction.options.getString("boss");

  if (!raidName || !bossName) {
    return interaction.editReply("❌ Paramètres invalides.");
  }

  const newStatus = commandName === "down" ? 1 : 0;

  // ✅ Mettre à jour le boss
 await pool.query(
  "UPDATE progression SET status = $1 WHERE raid = $2 AND boss = $3",
  [newStatus, raidName, bossName]
);
  
  // ✅ Mettre à jour le résumé global
const globalEmbed = await buildGlobalSummary();

const messages = await interaction.channel.messages.fetch({ limit: 50 });

const summaryMessage = messages.find(
  m => m.embeds[0]?.title === "📜 Résumé des extensions"
);

if (summaryMessage) {
  await summaryMessage.edit({ embeds: [globalEmbed] });
}

  // ✅ Récupérer le messageId
 const result = await pool.query(
  "SELECT messageId FROM progression WHERE raid = $1 LIMIT 1",
  [raidName]
);

const row = result.rows[0];

if (!row || !row.messageid) {
  console.log("❌ Aucun messageId trouvé pour", raidName);
  return interaction.editReply("❌ Embed introuvable.");
}

try {
  const channel = interaction.channel;
  const message = await channel.messages.fetch(row.messageid);

  const updatedEmbed = await buildEmbed(raidName);

  await message.edit({ embeds: [updatedEmbed] });

  return interaction.editReply(`✅ ${bossName} mis à jour.`);
} catch (error) {
  console.error("Erreur modification embed:", error);
  return interaction.editReply("❌ Impossible de modifier l'embed.");
}

  return;
}

    // ================= SETROLE =================
    if (commandName === "setrole") {

      const role = interaction.options.getRole("role");

     await pool.query(
  `INSERT INTO config (key, value)
   VALUES ('roleId', $1)
   ON CONFLICT (key)
   DO UPDATE SET value = EXCLUDED.value`,
  [role.id]
);

      return interaction.editReply(`✅ Rôle défini : ${role.name}`);
    }

    return interaction.editReply("Commande inconnue.");

  } catch (error) {
    console.error("ERREUR INTERACTION :", error);
    return interaction.editReply("❌ Une erreur est survenue.");
  }
});

client.login(process.env.TOKEN);

// ================= EXPRESS SERVER =================
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running ✅");
});

app.listen(process.env.PORT || 10000, "0.0.0.0", () => {
  console.log("Web server running");
});
