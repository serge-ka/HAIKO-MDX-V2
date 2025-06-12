import moment from 'moment-timezone';
import config from '../../config.cjs';

export default async function GroupParticipants(sock, { id, participants, action }) {
   try {
      const metadata = await sock.groupMetadata(id);

      for (const jid of participants) {
         let profilePic;

         try {
            profilePic = await sock.profilePictureUrl(jid, "image");
         } catch {
            profilePic = "https://i.ibb.co/fqvKZrP/ppdefault.jpg";
         }

         const userName = jid.split("@")[0];
         const membersCount = metadata.participants.length;
         const groupName = metadata.subject;

         if (action === "add" && config.WELCOME) {
            const joinTime = moment.tz('Africa/Kolkata').format('HH:mm:ss');
            const joinDate = moment.tz('Africa/Kolkata').format('DD/MM/YYYY');

            await sock.sendMessage(id, {
               image: { url: profilePic },
               caption: `╭╼━≪•𝐖𝐄𝐋𝐂𝐎𝐌𝐄•≫━╾╮
╽𝐇𝐄𝐘: @${userName} 👋
┃𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎: *${metadata.subject}*
┃𝐍𝐔𝐌𝐁𝐄𝐑: *${groupMembersCount}*
┃𝐓𝐈𝐌𝐄: *${timestamp}⏰*
╰━━━━━━♢━━♢━━━━━━╯
𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍☟ 
${desc}
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
               mentions: [jid],
               contextInfo: {
                  externalAdReply: {
                     title: `Welcome to the Realm`,
                     body: `You're now part of ${groupName}`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profilePic,
                     sourceUrl: 'https://github.com/PROFESSEURMDX/HAIKO-MDX-V2'
                  }
               }
            });
         }

         else if (action === "remove" && config.WELCOME) {
            const leaveTime = moment.tz('Africa/Tanzania').format('HH:mm:ss');
            const leaveDate = moment.tz('Africa/Tanzania').format('DD/MM/YYYY');

            await sock.sendMessage(id, {
               image: { url: profilePic },
               caption: `╭╼━≪•𝐆𝐎𝐎𝐃𝐁𝐘𝐄•≫━╾╮
╽𝐆𝐎𝐎𝐃𝐁𝐘𝐄: @${userName} 👋
┃𝐆𝐎𝐎𝐃𝐁𝐘𝐄 𝐓𝐎: *${metadata.subject}*
┃𝐍𝐔𝐌𝐁𝐄𝐑: *${groupMembersCount}*
┃𝐓𝐈𝐌𝐄: *${timestamp}⏰*
╰━━━━━━♢━━♢━━━━━━╯
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
               mentions: [jid],
               contextInfo: {
                  externalAdReply: {
                     title: `Goodbye, fallen soldier`,
                     body: `Farewell from ${groupName}`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profilePic,
                     sourceUrl: 'https://github.com/PROFESSEURMDX/HAIKO-MDX-V2'
                  }
               }
            });
         }
      }
   } catch (e) {
      console.error("❌ Error in GroupParticipants:", e);
   }
}
