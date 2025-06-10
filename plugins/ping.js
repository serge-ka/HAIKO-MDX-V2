import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "ping") {
    const start = new Date().getTime();
    await m.React('🍁');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;



    const text = `╭━━━━⪻•𝐏𝐈𝐍𝐆 𝐓𝐄𝐒𝐓•⪼━━━━╮
┃📡𝐁𝐎𝐓: *𝐇𝐀𝐈𝐊𝐎 𝐌𝐃𝐗 𝐕𝟐*
┃🌟𝐏𝐈𝐍𝐆: *HAIKO MDX V2 is80${responseTime.toFixed(2)}8 MS*
╰━━━━━━⦉𝐗𝐓𝐑𝐄𝐌𝐄⦊━━━━━━╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx 💙*`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
