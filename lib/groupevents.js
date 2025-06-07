//Give Me Credit If Using This File Give Me Credit On Your Channel ✅ 
// Credits Dev Professeur - HAIKO-MDX-V2 💜 

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363398101781980@newsletter',
            newsletterName: '𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟐',
            serverMessageId: 143,
        },
    };
};

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `> ╭╼━≪•𝐖𝐄𝐋𝐂𝐎𝐌𝐄•≫━╾╮
> ╽𝐇𝐄𝐘: @${userName} 👋
> ┃𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎: *${metadata.subject}*
> ┃𝐍𝐔𝐌𝐁𝐄𝐑: *${groupMembersCount}*
> ┃𝐓𝐈𝐌𝐄: *${timestamp}⏰*
> ╰━━━━━━♢━━♢━━━━━━╯
𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍☟ 
${desc}
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `> ╭╼━≪•𝐆𝐎𝐎𝐃𝐁𝐘𝐄•≫━╾╮
> ╽𝐆𝐎𝐎𝐃𝐁𝐘𝐄: @${userName} 👋
> ┃𝐆𝐎𝐎𝐃𝐁𝐘𝐄 𝐓𝐎: *${metadata.subject}*
> ┃𝐍𝐔𝐌𝐁𝐄𝐑: *${groupMembersCount}*
> ┃𝐓𝐈𝐌𝐄: *${timestamp}⏰*
> ╰━━━━━━♢━━♢━━━━━━╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `
> ╭─⪨ 𝐀𝐃𝐌𝐈𝐍 𝐄𝐕𝐄𝐍𝐓 ⪩ :
> │@${demoter} 𝐇𝐀𝐒 𝐃𝐄𝐌𝐎𝐓𝐄𝐃 @${userName} 𝐅𝐑𝐎𝐌 𝐀𝐃𝐌𝐈𝐍. 👀
> │
> │──────────────────
> │⏰ 𝐓𝐈𝐌𝐄:*${timestamp}*
> │──────────────────
> │🙋‍♂️ 𝐆𝐑𝐎𝐔𝐏:*${metadata.subject}*
> │
> ╰─────────────────╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                    image: { url: ppUrl },
                });

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: AdminText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `
> ╭─⪨ 𝐀𝐃𝐌𝐈𝐍 𝐄𝐕𝐄𝐍𝐓 ⪩ :
> │@${promoter} 𝐇𝐀𝐒 𝐏𝐑𝐎𝐌𝐎𝐓𝐄𝐃 @${userName} 𝐓𝐎 𝐀𝐃𝐌𝐈𝐍. 🎉
> │
> │──────────────────
> │⏰ 𝐓𝐈𝐌𝐄:*${timestamp}*
> │──────────────────
> │🙋‍♂️ 𝐆𝐑𝐎𝐔𝐏:*${metadata.subject}*
> │
> ╰─────────────────╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                    
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                    
                });
                
                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: AdaminText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
