const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["bot", "online"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "👻",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
╭───〔 *🤖 STATUS* 〕───◉
│✨ *Bot is Active & Online!*
│
│🧠 *Owner:* ${config.OWNER_NAME}
│⚡ *Version:* 2.0.0
│📝 *Prefix:* [${config.PREFIX}]
│📳 *Mode:* [${config.MODE}]
│💾 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│🖥️ *Host:* ${os.hostname()}
│⌛ *Uptime:* ${runtime(process.uptime())}
╰────────────────────◉
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*}`;

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/cad2f0.jpg` },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363372853772240@newsletter',
                    newsletterName: '𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟐',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
          
