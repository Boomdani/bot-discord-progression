require("dotenv").config();
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

// ================= SECURITY LOG =================
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
            const row = rows.find((r) => r.boss === boss);
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
          .setColor(EXTENSION_COLORS[extension])
          .setFooter({ text: `Extension : ${extension}` })
          .setTimestamp();

        resolve(embed);
      }
    );
  });
}

function buildExtensionSummaries() {
  return new Promise((resolve) => {

    db.all("SELECT * FROM progression", (err, rows) => {

      const extensions = {
        Vanilla: { total: 0, down: 0 },
        BC: { total: 0, down: 0 },
        WOTLK: { total: 0, down: 0 }
      };

      for (const raidName in raids) {
        const extension = getExpansion(raidName);
        const bosses = raids[raidName];

        if (!extension) continue;

        bosses.forEach(boss => {
          extensions[extension].total++;
          const row = rows.find(r => r.raid === raidName && r.boss === boss);
          if (row?.status) extensions[extension].down++;
        });
      }

      const embeds = [];

      for (const ext in extensions) {

        const total = extensions[ext].total;
        const down = extensions[ext].down;
        const percent = total === 0 ? 0 : Math.round((down / total) * 100);

        const embed = new EmbedBuilder()
          .setTitle(`📊 Résumé ${ext}`)
          .addFields(
            { name: "Boss tombés", value: `${down}`, inline: true },
            { name: "Boss total", value: `${total}`, inline: true },
            { name: "Progression", value: `${percent}%`, inline: true }
          )
          .setColor(EXTENSION_COLORS[ext])
          .setTimestamp();

        embeds.push(embed);
      }

      resolve(embeds);
    });
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
      option.setName("raid").setDescription("Raid").setRequired(true).setAutocomplete(true))
    .addStringOption(option =>
      option.setName("boss").setDescription("Boss").setRequired(true).setAutocomplete(true)),

  new SlashCommandBuilder()
    .setName("undown")
    .setDescription("Décocher un boss")
    .addStringOption(option =>
      option.setName("raid").setDescription("Raid").setRequired(true).setAutocomplete(true))
    .addStringOption(option =>
      option.setName("boss").setDescription("Boss").setRequired(true).setAutocomplete(true)),

  new SlashCommandBuilder()
    .setName("setrole")
    .setDescription("Définir le rôle autorisé")
    .addRoleOption(option =>
      option.setName("role").setDescription("Rôle autorisé").setRequired(true))
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

  const focused = interaction.options.getFocused(true);

  if (focused.name === "raid") {
    const filtered = Object.keys(raids).filter(r =>
      r.toLowerCase().includes(focused.value.toLowerCase())
    );

    return interaction.respond(
      filtered.slice(0, 25).map(r => ({ name: r, value: r }))
    );
  }

  if (focused.name === "boss") {
    const raidName = interaction.options.getString("raid");
    if (!raidName || !raids[raidName]) return interaction.respond([]);

    const filtered = raids[raidName].filter(b =>
      b.toLowerCase().includes(focused.value.toLowerCase())
    );

    return interaction.respond(
      filtered.slice(0, 25).map(b => ({ name: b, value: b }))
    );
  }
});

// ================= COMMAND HANDLER =================
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "setrole") {
    const role = interaction.options.getRole("role");

    db.run(
      "INSERT OR REPLACE INTO config (key, value) VALUES ('roleId', ?)",
      [role.id]
    );

    return interaction.reply({ content: `✅ Rôle défini : ${role.name}`, flags: 64 });
  }

  if (!(await hasPermission(interaction.member))) {
    return interaction.reply({ content: "❌ Permission refusée.", flags: 64 });
  }

  if (commandName === "setup-progress") {
    const channel = interaction.channel;

    for (const raidName in raids) {
      for (const boss of raids[raidName]) {
        db.run(
          "INSERT OR IGNORE INTO progression (raid, boss, status) VALUES (?, ?, 0)",
          [raidName, boss]
        );
      }

      const embed = await buildEmbed(raidName);
      const message = await channel.send({ embeds: [embed] });

      db.run(
        "UPDATE progression SET messageId = ? WHERE raid = ?",
        [message.id, raidName]
      );
    }

    const summaryEmbeds = await buildExtensionSummaries();
    await channel.send({ embeds: summaryEmbeds });

    return interaction.reply({ content: "✅ Progression installée.", flags: 64 });
  }

  if (commandName === "down" || commandName === "undown") {
    const raidName = interaction.options.getString("raid");
    const bossName = interaction.options.getString("boss");

    db.run(
      "UPDATE progression SET status = ? WHERE raid = ? AND boss = ?",
      [commandName === "down" ? 1 : 0, raidName, bossName],
      async () => {

        db.get(
          "SELECT messageId FROM progression WHERE raid = ? LIMIT 1",
          [raidName],
          async (err, row) => {

            const message = await interaction.channel.messages.fetch(row.messageId);
            const embed = await buildEmbed(raidName);
            await message.edit({ embeds: [embed] });

            const summaries = await buildExtensionSummaries();

// Supprimer anciens résumés
const messages = await interaction.channel.messages.fetch({ limit: 50 });

for (const msg of messages.values()) {
  if (msg.embeds[0]?.title?.startsWith("📊 Résumé")) {
    await msg.delete().catch(() => {});
  }
}

// Recréer les résumés
await interaction.channel.send({ embeds: summaries });

            return interaction.reply({
              content: `✅ ${bossName} mis à jour.`,
              flags: 64
            });
          }
        );
      }
    );
  }
});

client.login(process.env.TOKEN);