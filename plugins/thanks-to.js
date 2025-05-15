const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "thanks",
    alias: ["thanksto", "dev"],
    desc: "thanks to dev for helping",
    category: "main",
    react: "🧸",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const message = `
╭─❏ *THANKS TO :*
│
│👨‍💻 DEV:© *PROFESSEUR♻️*
│🪀 NUM:+529633982655
│───────────────────────
│🛠️ *BOT NAME:* © *HAIKO-MDX-V2*
│───────────────────────
│🙋‍♂️ HELLO @${m.sender.split("@")[0]}
│
╰──────────────────────❏
`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/opqgmz.jpg' },
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398101781980@newsletter', // remplace avec ton vrai newsletterJid si besoin
                    newsletterName: '𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟐',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("ThanksTo Error:", err);
        await conn.sendMessage(from, { text: `Error: ${err.message}` }, { quoted: mek });
    }
});
