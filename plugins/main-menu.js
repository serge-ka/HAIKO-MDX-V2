const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const axios = require('axios');

function toSmallCaps(str) {
  const smallCaps = {
    A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ',
    I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ',
    Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x',
    Y: 'ʏ', Z: 'ᴢ'
  };
  return str.toUpperCase().split('').map(c => smallCaps[c] || c).join('');
}

cmd({
  pattern: "menu",
  alias: ["👑", "xtreme"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "👑",
  filename: __filename
},
async (dyby, mek, m, { from, reply }) => {
  try {
    const totalCommands = commands.length;
    const date = moment().tz("America/Mexico").format("dddd, DD MMMM YYYY");

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    let haikomenu = `
╭══⪨ 𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟐 ⪩══╮
┃♔♚ 𝗨𝗦𝗘𝗥 : @${m.sender.split("@")[0]}
┃♔♚ 𝗧𝗜𝗠𝗘 : ${uptime()}
┃♔♚ 𝗠𝗢𝗗𝗘 : *${config.MODE}*
┃♔♚ 𝗣𝗥𝗘𝗙𝗜𝗫 : [${config.PREFIX}]
┃♔♚ 𝗣𝗟𝗨𝗚𝗜𝗡 :  ${totalCommands}
┃♔♚ 𝗗𝗘𝗩 : 𝗣𝗥𝗢𝗙-𝗫𝗧𝗥𝗘𝗠𝗘
┃♔♚ 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 : 𝟮.𝟬.𝟬
╰═══════════════════╯`;
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      dybymenu += `\n\n╭╼━⪨ ${k.toUpperCase()} MENU ⪩━╾╮`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        dyby += `\n│➻ ${config.PREFIX}${toSmallCaps(usage)}`;
      });
  dybymenu += `\n╰╼━━━━━━━━━━━━╾╯`;
    }

    dybymenu += `\n`;
    
await dyby.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL },
      caption: dybymenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363398101781980@newsletter',
          newsletterName: '𝑯𝑨𝑰𝑲𝑶-𝑴𝑫𝑿',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
