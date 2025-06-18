//Give Me Credit If Using This File Give Me Credit On Your Channel ✅ 
// Credits Dev Professeur - HAIKO-MDX-V2 💜 

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const fallbackPP = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';

const getContextInfo = (m) => ({
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363398101781980@newsletter',
            newsletterName: '𝐏𝐑𝐎𝐅-𝐗𝐓𝐑𝐄𝐌𝐄',
            serverMessageId: 143,
        },
    });

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
                const WelcomeText = `╭╼━≪•𝐖𝐄𝐋𝐂𝐎𝐌𝐄•≫━╾╮
┃𝐇𝐄𝐘: @${userName} 👋
┃𝐃𝐄𝐕: 𝐏𝐑𝐎𝐅-𝐗𝐓𝐑𝐄𝐌𝐄
┃𝐍𝐔𝐌𝐁𝐄𝐑: #${groupMembersCount}
┃𝐓𝐈𝐌𝐄: ${timestamp}⏰
╰━━━━━━♢━━♢━━━━━╯
𝐗𝐓𝐑𝐄𝐌𝐄 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍
${desc}
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ xᴛʀᴇᴍᴇ*`;

                await conn.sendMessage(welcome, true);

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `╭╼━≪•𝐆𝐎𝐎𝐃𝐁𝐘𝐄•≫━╾╮
┃𝐁𝐘𝐄: @${userName} 👋
┃𝐃𝐄𝐕: 𝐏𝐑𝐎𝐅-𝐗𝐓𝐑𝐄𝐌𝐄
┃𝐍𝐔𝐌𝐁𝐄𝐑: #${groupMembersCount}
┃𝐓𝐈𝐌𝐄: ${timestamp}⏰
╰━━━━━━♢━━♢━━━━━╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ xᴛʀᴇᴍᴇ*`;

                await conn.sendMessage(goodbye, true);

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╭╼⪻ 𝚇𝚃𝚁𝙴𝙼𝙴-𝙲𝙰𝙻𝙻𝙴𝙳 ⪼╾╮
┃@${demoter} 𝙷𝙰𝚂 𝙳𝙴𝙼𝙾𝚃𝙴𝙳 @${userName} 𝙵𝚁𝙾𝙼 𝙰𝙳𝙼𝙸𝙽.
┃⏰ 𝚃𝙸𝙼𝙴:${timestamp}
┃👥 𝙶𝙽𝙰𝙼𝙴:${metadata.subject}
╰╼━━━━━━━━━━━━━━━╾╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ xᴛʀᴇᴍᴇ*`,

                await sendMessage(promoteMsg, false, [user, update.author].filter(Boolean));

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `
╭╼⪻ 𝚇𝚃𝚁𝙴𝙼𝙴-𝙰𝙿𝙿𝙾𝙸𝙽𝚃 ⪼╾╮
┃@${promoter} 𝙷𝙰𝚂 𝙿𝚁𝙾𝙼𝙾𝚃𝙴𝙳 @${userName} 𝚃𝙾 𝙰𝙳𝙼𝙸𝙽.
┃⏰ 𝚃𝙸𝙼𝙴:${timestamp}
┃👥 𝙶𝙽𝙰𝙼𝙴:${metadata.subject}
╰╼━━━━━━━━━━━━━━━━╾╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ xᴛʀᴇᴍᴇ*`,
                    
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                    
                });
                
                await sendMessage(demoteMsg, false, [user, update.author].filter(Boolean));
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
