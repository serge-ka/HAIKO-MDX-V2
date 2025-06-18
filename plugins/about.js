const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: "dev",
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `*╭═══⪨ 𝙱𝙸𝙾𝙶𝚁𝙰𝙿𝙷𝙸𝙴 ⪩═══╮*
*┃╭━━━━━━━━━━━━━━┈⊷*
*┃┃  ◦* *ᴄʀᴇᴀᴛᴇᴅ ʙʏ: ᴘʀᴏғ xᴛʀᴇᴍᴇ*
*┃┃  ◦* *ʀᴇᴀʟ ɴᴀᴍᴇ➩ sɪᴅᴅʜᴀʀᴛʜ's*
*┃┃  ◦* *ɴɪᴄᴋɴᴀᴍᴇ➩ xᴛʀᴇᴍᴇ*
*┃┃  ◦* *ᴀɢᴇ➩ ɴᴏᴛ ᴅᴇғɪɴᴇᴅ*
*┃┃  ◦* *ᴄɪᴛʏ➩ ɴᴏᴛ ᴅᴇғɪɴᴇᴅ* 
*┃╿ ◦* *ᴀ ᴘᴀꜱꜱɪᴏɴᴀᴛᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ᴅᴇᴠ*
*┃╰━━━━━━━━━━━━━━┈⊷*
*╰══════════════════╯*

*╭══⪨ 𝙾𝙽𝙻𝚈 𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁 ⪩══╮*
*┃  ◦* *✰➩ᴘʀᴏғ xᴛʀᴇᴍᴇ x ᴅʏʙʏ ᴛᴇᴄʜ*
*┃  ◦* *✰➩ᴏɴʟʏ 2 ᴅᴇᴠᴇʟᴏᴘᴇʀ*
*╰═══════════════════╯*

*╭╼═════════════════╾╮*
> *𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙿𝚁𝙾𝙵-𝚇𝚃𝚁𝙴𝙽𝙴*
*╰╼═════════════════╾╯*`
await conn.sendMessage(from, {
    image: { url: 'https://i.ibb.co/5WCmzFS6/4367.jpg' },
    caption: about,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363398101781980@newsletter', // ou ton JID actuel
            newsletterName: '𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗 𝐕𝟐',
            serverMessageId: 143
        }
    }
}, { quoted: mek })

}catch(e){
console.log(e)
reply(`${e}`)
}
})
