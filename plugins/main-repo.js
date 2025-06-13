const fetch = require('node-fetch');
const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch GitHub repository information",
    react: "⏳",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/PROFESSEURMDX/HAIKO-MDX-V2';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const repoData = await response.json();

        // Format 1: Classic Box
        const style1 = `╭───『 ${config.BOT_NAME} 𝐑𝐄𝐏𝐎 』───⳹
│
│ 📦 *REPOSITORY*: ${repoData.name}
│ 👑 *OWNER*: ${repoData.owner.login}
│ ⭐ *STARS*: ${repoData.stargazers_count}
│ ⑂ *FORKS*: ${repoData.forks_count}
│ 🔗 *URL*: ${repoData.html_url}
│
│ 📝 *Description*:
│ ${repoData.description || 'No description'}
│
╰────────────────⳹
> ${config.DESCRIPTION}`;

        // Format 2: Minimalist
        const style2 = `•——[ 𝐆𝐈𝐓𝐇𝐔𝐁 𝐈𝐍𝐅𝐎 ]——•
  │
  ├─ 🏷️ ${repoData.name}
  ├─ 👤 ${repoData.owner.login}
  ├─ ✨ ${repoData.stargazers_count} Stars
  ├─ ⑂ ${repoData.forks_count} Forks
  │URL: ${repoData.html_url}
  •——[ ${config.BOT_NAME} ]——•
  > ${config.DESCRIPTION}`;

        // Format 3: Fancy Borders
        const style3 = `▄▀▄▀▄ 𝐑𝐄𝐏𝐎𝐒𝐈𝐓𝐎𝐑𝐘 𝐈𝐍𝐅𝐎 ▄▀▄▀▄

  ♢ *PROJECT*: ${repoData.name}
  ♢ *AUTHOR*: ${repoData.owner.login}
  ♢ *STARS*: ${repoData.stargazers_count} ✨
  ♢ *FORKS*: ${repoData.forks_count} ⑂
  ♢ *UPDATED*: ${new Date(repoData.updated_at).toLocaleDateString()}
  
  🔗 ${repoData.html_url}
  
  > ${config.DESCRIPTION}`;

        // Format 4: Code Style
        const style4 = `┌──────────────────────┐
│  ♻️ ${config.BOT_NAME} 𝐑𝐄𝐏𝐎  ♻️  │
├──────────────────────┤
│ • NAME: ${repoData.name}
│ • OWNER: ${repoData.owner.login}
│ • STARS: ${repoData.stargazers_count}
│ • FORKS: ${repoData.forks_count}
│ • URL: ${repoData.html_url}
│ • DESC: ${repoData.description || 'None'}
└──────────────────────┘
> ${config.DESCRIPTION}`;

        // Format 5: Modern Blocks
        const style5 = `▰▰▰▰▰ 𝐑𝐄𝐏𝐎 𝐈𝐍𝐅𝐎 ▰▰▰▰▰

  🏷️  *${repoData.name}*
  👨‍💻  ${repoData.owner.login}
  
  ⭐ ${repoData.stargazers_count}  ⑂ ${repoData.forks_count}
  🔗 ${repoData.html_url}
  
  📜 ${repoData.description || 'NO DESCRIPTION'}
  
> ${config.DESCRIPTION}`;

        // Format 6: Retro Terminal
        const style6 = `╔══════════════════════╗
║   ${config.BOT_NAME} 𝐑𝐄𝐏𝐎    ║
╠══════════════════════╣
║ > NAME: ${repoData.name}
║ > OWNER: ${repoData.owner.login}
║ > STARS: ${repoData.stargazers_count}
║ > FORKS: ${repoData.forks_count}
║ > URL: ${repoData.html_url}
║ > DESC: ${repoData.description || 'None'}
╚══════════════════════╝
> ${config.DESCRIPTION}`;

        // Format 7: Elegant
        const style7 = `┌───────────────┐
│  📨  𝐑𝐄𝐏𝐎  │
└───────────────┘
│
│ *PROJECT*: ${repoData.name}
│ *AUTHOR*: ${repoData.owner.login}
│
│ ✨ ${repoData.stargazers_count} STARS 
│ ⑂ ${repoData.forks_count} Forks
│
│ 🔗 ${repoData.html_url}
│
┌───────────────┐
│  📝  𝐃𝐄𝐒𝐂  │
└───────────────┘
${repoData.description || 'NO DESCRIPTION'}

> ${config.DESCRIPTION}`;

        // Format 8: Social Media Style
        const style8 = `✦ ${config.BOT_NAME} REPOSITORY ✦

📌 *${repoData.name}*
👤 @${repoData.owner.login}

⭐ ${repoData.stargazers_count} Stars | ⑂ ${repoData.forks_count} Forks
🔄 Last updated: ${new Date(repoData.updated_at).toLocaleDateString()}

🔗 GITHUB: ${repoData.html_url}

${repoData.description || 'NO DESCRIPTION AVAILABLE'}

> ${config.DESCRIPTION}`;

        // Format 9: Fancy List
        const style9 = `╔♫═🎧═♫══════════╗
   ${config.BOT_NAME} 𝐑𝐄𝐏𝐎
╚♫═🎧═♫══════════╝

•・゜゜・* ✧  *・゜゜・•
 ✧ *NAME*: ${repoData.name}
 ✧ *OWNER*: ${repoData.owner.login}
 ✧ *STARS*: ${repoData.stargazers_count}
 ✧ *FORKS*: ${repoData.forks_count}
•・゜゜・* ✧  *・゜゜・•

🔗 ${repoData.html_url}

${repoData.description || 'No description'}

> ${config.DESCRIPTION}`;

        // Format 10: Professional
        const style10 = `┏━━━━━━━━━━━━━━━━━━┓
┃  𝐑𝐄𝐏𝐎𝐒𝐈𝐓𝐎𝐑𝐘 𝐑𝐄𝐏𝐎𝐑𝐓  ┃
┗━━━━━━━━━━━━━━━━━━┛

◈ PROJECT: ${repoData.name}
◈ MAINTAINER: ${repoData.owner.login}
◈ POPULARITY: ★ ${repoData.stargazers_count} | ⑂ ${repoData.forks_count}
◈ LAST UPDATE: ${new Date(repoData.updated_at).toLocaleDateString()}
◈ URL: ${repoData.html_url}

DESCRIPTION:
${repoData.description || 'NO DESCRIPTION PROVIDED'}

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ xᴛʀᴇᴍᴇ*`;

        const styles = [style1, style2, style3, style4, style5, style6, style7, style8, style9, style10];
        const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

        // Send image with repo info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/v4pdfd.jpg` },
            caption: selectedStyle,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398101781980@newsletter',
                    newsletterName: config.OWNER_NAME || '𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟐🪀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/uzvvj1.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Repo command error:", error);
        reply(`❌ Error: ${error.message}`);
    }
});
             
