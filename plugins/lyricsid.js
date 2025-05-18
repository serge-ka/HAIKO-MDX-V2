const fs = require("fs-extra");
const path = require("path");
const { cmd } = require("../command");

const CACHE_PATH = path.join(__dirname, "..", "data", "lyrics_cache.json");
let cache = fs.readJsonSync(CACHE_PATH, { throws: false }) || {};

cmd({
  pattern: "lyricsid",
  desc: "Afficher les paroles enregistrées par ID",
  react: "📋",
  category: "utility",
  use: ".lyricsid <id>",
  filename: __filename,
}, async (conn, m, msg, { args, reply }) => {
  const id = args[0];
  if (!id || !cache[id]) {
    return reply("❌ ID invalide ou non trouvé.");
  }

  const { title, lyrics } = cache[id];
  reply(`🎵 *${title}*\n\n${lyrics}`);
});
