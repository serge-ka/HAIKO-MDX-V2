const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "haiko",
    alias: ["thanksto"],
    desc: "thanks to dev for helping",
    category: "main",
    react: "💬",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const message =`╭━━━⪨𝗛𝗔𝗜𝗞𝗢-𝗠𝗗𝗫⪩━━━╮
┃╭╼━━━━━━━━━━━┈⊷
┃┃👨‍💻 𝗗𝗘𝗩:𝗣𝗥𝗢𝗙-𝗫𝗧𝗥𝗘𝗠𝗘
┃┃🪀 𝗡𝗨𝗠𝗕𝗘𝗥:+529633982655
┃┃🛠️ 𝗕𝗡𝗔𝗠𝗘:𝗛𝗔𝗜𝗞𝗢 𝗠𝗗𝗫
┃┃🙋‍♂️ 𝗛𝗜: @${m.sender.split("@")[0]}
┃╰╼━━━━━━━━━━━┈⊷
╰╼══════════════╾╯
> *𝑃𝑂𝑊𝐸𝑅𝐸𝐷 𝐵𝑌 𝑋𝑇𝑅𝐸𝑀𝐸*`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/1mp4yn.jpg' },
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398101781980@newsletter', // remplace avec ton vrai newsletterJid si besoin
                    newsletterName: '⪨𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟐⪩',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("ThanksTo Error:", err);
        await conn.sendMessage(from, { text: `Error: ${err.message}` }, { quoted: mek });
    }
});
