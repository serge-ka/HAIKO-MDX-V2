import fs from 'fs';
import config from '../../config.cjs';
import pkg from '@whiskeysockets/baileys';
const { proto, downloadContentFromMessage } = pkg;

const prefix = config.PREFIX;
const antiDeleteGlobal = config.ANTI_DELETE;

const demonContext = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363398101781980@newsletter',
    newsletterName: "HAIKO-MDX-V2",
    serverMessageId: 143
  }
};

class DemonAntiDelete {
  constructor() {
    this.enabled = false;
    this.messageCache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanExpiredMessages(), this.cacheExpiry);
  }

  cleanExpiredMessages() {
    const now = Date.now();
    for (const [key, msg] of this.messageCache.entries()) {
      if (now - msg.timestamp > this.cacheExpiry) {
        this.messageCache.delete(key);
      }
    }
  }

  formatTime(timestamp) {
    const options = {
      timeZone: 'Asia/Karachi',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return new Date(timestamp).toLocaleString('en-PK', options) + ' (PKT)';
  }
}

const demonDelete = new DemonAntiDelete();
const statusPath = './demon_antidelete.json';

let statusData = {};
if (fs.existsSync(statusPath)) {
  statusData = JSON.parse(fs.readFileSync(statusPath));
}
if (!statusData.chats) statusData.chats = {};

if (antiDeleteGlobal) {
  demonDelete.enabled = true;
}

const AntiDelete = async (m, Matrix) => {
  const chatId = m.from;
  const formatJid = (jid) => jid ? jid.replace(/@s\.whatsapp\.net|@g\.us/g, '') : 'Unknown';

  const getChatInfo = async (jid) => {
    if (!jid) return { name: 'Unknown Chat', isGroup: false };
    if (jid.includes('@g.us')) {
      try {
        const groupMetadata = await Matrix.groupMetadata(jid);
        return {
          name: groupMetadata?.subject || 'Demon Nest',
          isGroup: true
        };
      } catch {
        return { name: 'Demon Nest', isGroup: true };
      }
    }
    return { name: 'Private Mission', isGroup: false };
  };

  if (m.body.toLowerCase() === `${prefix}antidelete on` || m.body.toLowerCase() === `${prefix}antidelete off`) {
    const responses = {
      on: {
        text: `*HAIKO-MDX Anti-Delete Activated!*\n\n` +
              `• Status: ✅ Enabled\n` +
              `• Cache: 🕒 5 minutes\n` +
              `• Mode: 🌐 Global\n\n` +
              `_Deleted messages will now rise from the shadows_\n\n` +
              `━━━━━━⊱✿⊰━━━━━━\n` +
              `ᴘᴏᴡᴇʀᴇᴅ ʙʏ inconnu boy`,
        contextInfo: demonContext
      },
      off: {
        text: `HAIKO-MDX Anti-Delete Deactivated!*\n\n` +
              `• Status: ❌ Disabled\n\n` +
              `_Message recovery disabled_\n\n` +
              `━━━━━━⊱✿⊰━━━━━━\n` +
              `ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ᴘʀᴏғᴇss`,
        contextInfo: demonContext
      }
    };

    if (m.body.toLowerCase() === `${prefix}antidelete on`) {
      statusData.chats[chatId] = true;
      fs.writeFileSync(statusPath, JSON.stringify(statusData, null, 2));
      demonDelete.enabled = true;
      await Matrix.sendMessage(m.from, responses.on, { quoted: m });
    } else {
      statusData.chats[chatId] = false;
      fs.writeFileSync(statusPath, JSON.stringify(statusData, null, 2));
      demonDelete.enabled = false;
      demonDelete.messageCache.clear();
      await Matrix.sendMessage(m.from, responses.off, { quoted: m });
    }

    await Matrix.sendReaction(m.from, m.key, '⚔️');
    return;
  }

  Matrix.ev.on('messages.upsert', async ({ messages }) => {
    if (!antiDeleteGlobal && !demonDelete.enabled) return;
    if (!messages?.length) return;

    for (const msg of messages) {
      if (msg.key.fromMe || !msg.message || msg.key.remoteJid === 'status@broadcast') continue;

      try {
        const content = msg.message.conversation ||
          msg.message.extendedTextMessage?.text ||
          msg.message.imageMessage?.caption ||
          msg.message.videoMessage?.caption ||
          msg.message.documentMessage?.caption;

        let media, type, mimetype;
        const mediaTypes = ['image', 'video', 'audio', 'sticker', 'document'];

        for (const mediaType of mediaTypes) {
          if (msg.message[`${mediaType}Message`]) {
            const mediaMsg = msg.message[`${mediaType}Message`];
            try {
              const stream = await downloadContentFromMessage(mediaMsg, mediaType);
              let buffer = Buffer.from([]);
              for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
              media = buffer;
              type = mediaType;
              mimetype = mediaMsg.mimetype;
              break;
            } catch {}
          }
        }

        if (msg.message.audioMessage?.ptt) {
          try {
            const stream = await downloadContentFromMessage(msg.message.audioMess
