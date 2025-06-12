import config from '../../config.cjs';

const tagEveryoneInGroup = async (message, sock) => {
  const prefix = config.PREFIX;
  const cmd = message.body.startsWith(prefix)
    ? message.body.slice(prefix.length).trim().split(' ')[0].toLowerCase()
    : '';

  if (cmd !== 'tagall2','appel2') return;

  if (!message.isGroup) {
    return await sock.sendMessage(
      message.from,
      { text: '🚫 Cette commande fonctionne uniquement dans les groupes.' },
      { quoted: message }
    );
  }

  try {
    const groupMeta = await sock.groupMetadata(message.from);
    const participants = groupMeta.participants;
    const senderId = message.sender;

    // Récupère la photo de profil du créateur du message
    let profilePicture = 'https://i.imgur.com/8fK4h6F.jpg';
    try {
      profilePicture = await sock.profilePictureUrl(senderId, 'image');
    } catch (e) {}

    // Prépare les mentions (membres + admins)
    const mentions = participants.map(p => p.id);

    // Nombre d'admins
    const adminCount = participants.filter(p => p.admin).length;

    // Nom de l’auteur du message
    const senderName = senderId.split('@')[0];

    // Message personnalisé (ou texte par défaut)
    const rawText = message.body.trim().split(' ').slice(1).join(' ');
    const userText = rawText || 'Blanc';

    // Liste des mentions ligne par ligne
    const tagList = mentions.map(id => `@${id.split('@')[0]}`).join('\n');

    const caption = `
╭──────◇𝙼𝙴𝙽𝚃𝙸𝙾𝙽 𝟸◇──────╮
│ 𝐇𝐀𝐈𝐊𝐎 𝐌𝐃𝐗 𝐕𝟐 𝐓𝐀𝐆𝐀𝐋𝐋𝟐
╰───────✰𝚇𝚃𝚁𝙴𝙼𝙴✰───────╯

👥 *𝙶𝚁𝙾𝚄𝙿𝙴* : ${groupMeta.subject}
👤 *𝙰𝚄𝚃𝙴𝚄𝚁* : @${senderName}
👨‍👩‍👧‍👦 *𝙼𝙴𝙼𝙱𝚁𝙴𝚂* : ${participants.length}
🛡️ *𝙰𝙳𝙼𝙸𝙽𝚂* : ${adminCount}

🗒️ *𝙼𝙴𝚂𝚂𝙰𝙶𝙴* :
${userText}

${tagList}

> *MADE IN BY PROF XTREME*
`;

    await sock.sendMessage(
      message.from,
      {
        image: { url: profilePicture },
        caption,
        mentions
      },
      { quoted: message }
    );

  } catch (err) {
    console.error('Erreur dans tagall:', err);
    await sock.sendMessage(
      message.from,
      { text: '❌ Une erreur est survenue lors du tag.' },
      { quoted: message }
    );
  }
};

export default tagEveryoneInGroup;
