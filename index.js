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
const sqlite3 = require("sqlite3").verbose();
const raids = require("./raids");

const EXTENSION_COLORS = {
  Vanilla: 0x8B4513,
  BC: 0x2ecc71,
  WOTLK: 0x3498db
};

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const db = new sqlite3.Database("./database.sqlite");

// ================= DATABASE INIT =================
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS progression (
    raid TEXT,
    boss TEXT,
    status INTEGER,
    messageId TEXT,
    PRIMARY KEY (raid, boss)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);
});

// ================= SECURITY =================
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// ================= HELPERS =================
function hasPermission(member) {
  return new Promise((resolve) => {
    db.get("SELECT value FROM config WHERE key = 'roleId'", (err, row) => {
      if (!row) {
        return resolve(
          member.permissions.has(PermissionsBitField.Flags.Administrator)
        );
      }

      resolve(
        member.roles.cache.has(row.value) ||
        member.permissions.has(PermissionsBitField.Flags.Administrator)
      );
    });
  });
}

function getExpansion(raidName) {
  if (raidName.includes("Vanilla")) return "Vanilla";
  if (raidName.includes("BC")) return "BC";
  if (raidName.includes("WOTLK")) return "WOTLK";
  return null;
}

function buildEmbed(raidName) {
  return new Promise((resolve) => {
    db.all(
      "SELECT * FROM progression WHERE raid = ?",
      [raidName],
      (err, rows) => {

        const bosses = raids[raidName];
        let done = 0;

        const description = bosses
          .map((boss) => {
            const row = rows?.find((r) => r.boss === boss);
            const isDown = row?.status;

            if (isDown) done++;

            const icon = isDown ? "🟢" : "🔴";
            return `${icon} ${boss}`;
          })
          .join("\n");

        const extension = getExpansion(raidName);

        const embed = new EmbedBuilder()
          .setTitle(`🏰 ${raidName}`)
          .setDescription(description)
          .addFields({
            name: "Progression",
            value: `**${done} / ${bosses.length} boss down**`
          })
          .setColor(EXTENSION_COLORS[extension] || 0xffffff)
          .setFooter({ text: `Extension : ${extension}` })
          .setTimestamp();

        resolve(embed);
      }
    );
  });
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
   if (commandName === "setup-progress") {

  const channel = interaction.channel;
  if (!channel) {
    return interaction.editReply("❌ Impossible de trouver le salon.");
  }

  for (const raidName of Object.keys(raids)) {

    const bosses = raids[raidName];

    // ✅ Initialiser les boss
    for (const boss of bosses) {
      await new Promise((resolve, reject) => {
        db.run(
          "INSERT OR IGNORE INTO progression (raid, boss, status) VALUES (?, ?, 0)",
          [raidName, boss],
          (err) => err ? reject(err) : resolve()
        );
      });
    }

    const embed = await buildEmbed(raidName);
    const message = await channel.send({ embeds: [embed] });

    // ✅ Attendre que le messageId soit bien enregistré
    await new Promise((resolve, reject) => {
      db.run(
        "UPDATE progression SET messageId = ? WHERE raid = ?",
        [message.id, raidName],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    console.log(`✅ Message ID enregistré pour ${raidName} : ${message.id}`);
  }

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
  await new Promise((resolve, reject) => {
    db.run(
      "UPDATE progression SET status = ? WHERE raid = ? AND boss = ?",
      [newStatus, raidName, bossName],
      (err) => err ? reject(err) : resolve()
    );
  });

  // ✅ Récupérer le messageId
  db.get(
    "SELECT messageId FROM progression WHERE raid = ? LIMIT 1",
    [raidName],
    async (err, row) => {

      if (err || !row || !row.messageId) {
        console.log("❌ Aucun messageId trouvé pour", raidName);
        return interaction.editReply("❌ Embed introuvable.");
      }

      try {
        const channel = interaction.channel;
        const message = await channel.messages.fetch(row.messageId);

        const updatedEmbed = await buildEmbed(raidName);

        await message.edit({ embeds: [updatedEmbed] });

        return interaction.editReply(`✅ ${bossName} mis à jour.`);
      } catch (error) {
        console.error("Erreur modification embed:", error);
        return interaction.editReply("❌ Impossible de modifier l'embed.");
      }
    }
  );

  return;
}

    // ================= SETROLE =================
    if (commandName === "setrole") {

      const role = interaction.options.getRole("role");

      db.run(
        "INSERT OR REPLACE INTO config (key, value) VALUES ('roleId', ?)",
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
