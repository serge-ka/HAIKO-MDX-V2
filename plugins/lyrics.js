const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const cheerio = require("cheerio");
const { cmd } = require("../command");

const GENIUS_API_KEY = "XOxelFDJbxYpjeS154VLIHx0bcEzrCzF1ZVUHN7fqOohg0_2zVuoiE9kyLzqXWip";
const CACHE_PATH = path.join(__dirname, "..", "data", "lyrics_cache.json");
fs.ensureFileSync(CACHE_PATH);
let cache = fs.readJsonSync(CACHE_PATH, { throws: false }) || {};

function saveCache() {
  fs.writeJsonSync(CACHE_PATH, cache, { spaces: 2 });
}

function generateID() {
  return Math.random().toString(36).substring(2, 10);
}

cmd({
  pattern: "lyrics",
  alias: ["lyric"],
  desc: "Trouve les paroles avec Genius",
  react: "🎵",
  category: "utility",
  use: ".lyrics <titre chanson>",
  filename: __filename,
}, async (conn, m, msg, { args, reply }) => {
  const query = args.join(" ");
  if (!query) return reply("❌ Donne un titre de chanson.\nEx: `.lyrics Shape of You`");

  try {
    reply("🔍 Recherche en cours sur Genius...");

    const search = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${GENIUS_API_KEY}` }
    });

    const hit = search.data.response.hits[0];
    if (!hit) return reply("❌ Aucune chanson trouvée.");

    const { full_title, url } = hit.result;

    const page = await axios.get(url);
    const $ = cheerio.load(page.data);
    const lyrics = $(".lyrics").text().trim() || $('[data-lyrics-container="true"]').text().trim();

    if (!lyrics) return reply("❌ Paroles introuvables.");

    const id = generateID();
    cache[id] = { title: full_title, lyrics };
    saveCache();

    await conn.sendMessage(msg.from, {
      text: `🎶 *${full_title}*\n\n${lyrics}`,
      footer: `ID: ${id} | .lyricsid ${id} pour revoir`,
      buttons: [
        { buttonId: `.lyricsid ${id}`, buttonText: { displayText: "Copier les paroles" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply("❌ Erreur lors de la récupération des paroles.");
  }
});
