const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu2",
    desc: "Show interactive menu system",
    category: "menu",
    react: "🛸",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const menuCaption = `╭━⪨ *𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟐* ⪩━┈⊷
├❁╭─────────────
├❁│ Owner : *${config.OWNER_NAME}*
├❁│ Baileys : *Multi Device*
├❁│ Type : *NodeJs*
├❁│ Platform : *GitHub*
├❁│ Mode : *[${config.MODE}]*
├❁│ Prefix : *➥${config.PREFIX}*
├❁│ Version : *2.0.0 Bᴇᴛᴀ*
├❁╰─────────────
╰━━━━━━━━━━━━━┈⊷
╭━⪨💮𝐌𝐄𝐍𝐔 𝐋𝐈𝐒𝐓⪩━┈⊷
├❒╭─────────────·๏
├❒┃➢ ❶ *DOWNLOAD MENU*
├❒┃➢ ❷ *GROUP MENU*
├❒┃➢ ❸ *FUN MENU*
├❒┃➢ ❹ *OWNER MENU*
├❒┃➢ ❺ *AI MENU*
├❒┃➢ ❻ *ANIME MENU*
├❒┃➢ ❼ *CONVERT MENU*
├❒┃➢ ❽ *OTHER MENU*
├❒┃➢ ❾ *REACTIONS MENU*
├❒┃➢ ➓ *MAIN MENU*
├❒╰──────────┈⊷
╰─────────────┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ xᴛʀᴇᴍᴇ*`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363398101781980@newsletter',
                newsletterName: "𝐏𝐑𝐎𝐅-𝐗𝐓𝐑𝐄𝐌𝐄",
                serverMessageId: 143
            }
        };

        // Function to send menu image with timeout
        const sendMenuImage = async () => {
            try {
                return await conn.sendMessage(
                    from,
                    {
                        image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/xp1wdz.jpg' },
                        caption: menuCaption,
                        contextInfo: contextInfo
                    },
                    { quoted: mek }
                );
            } catch (e) {
                console.log('Image send failed, falling back to text');
                return await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        };

        // Function to send menu audio with timeout
        const sendMenuAudio = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay after image
                await conn.sendMessage(from, {
                    audio: { url: 'https://files.catbox.moe/uzvvj1.mp3' },
                    mimetype: 'audio/mp4',
                    ptt: true,
                }, { quoted: mek });
            } catch (e) {
                console.log('Audio send failed, continuing without it');
            }
        };

        // Send image first, then audio sequentially
        let sentMsg;
        try {
            // Send image with 10s timeout
            sentMsg = await Promise.race([
                sendMenuImage(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Image send timeout')), 10000))
            ]);
            
            // Then send audio with 1s delay and 8s timeout
            await Promise.race([
                sendMenuAudio(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Audio send timeout')), 8000))
            ]);
        } catch (e) {
            console.log('Menu send error:', e);
            if (!sentMsg) {
                sentMsg = await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        }
        
        const messageID = sentMsg.key.id;

        // Menu data (complete version)
        const menuData = {
            '1': {
                title: "📥 *Download Menu* 📥",
                content: `╭━⪨📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭────────────────·๏
├❒┃➢  facebook
├❒┃➢  mediafire
├❒┃➢  tiktok
├❒┃➢  twitter
├❒┃➢  insta
├❒┃➢  apk
├❒┃➢  img
├❒┃➢  tt2
├❒┃➢  pins
├❒┃➢  apk2
├❒┃➢  fb2
├❒┃➢  pinterest
├❒┃➢  spotify
├❒┃➢  play
├❒┃➢  play2
├❒┃➢  audio
├❒┃➢  video
├❒┃➢  video2
├❒┃➢  ytmp3
├❒┃➢  ytmp4
├❒┃➢  song
├❒┃➢  darama
├❒┃➢ gdrive
├❒┃➢  ssweb
├❒┃➢  tiks
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '2': {
                title: "👥 *Group Menu* 👥",
                content: `╭━⪨👥𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  grouplink
├❒┃➢  kickall
├❒┃➢  kickall2
├❒┃➢  kickall3
├❒┃➢  add
├❒┃➢  remove
├❒┃➢  kick
├❒┃➢  promote
├❒┃➢  demote
├❒┃➢  dismiss
├❒┃➢  revoke
├❒┃➢  setgoodbye
├❒┃➢  setwelcome
├❒┃➢  delete
├❒┃➢  getpic
├❒┃➢  ginfo
├❒┃➢  disappear on
├❒┃➢  disappear off
├❒┃➢  disappear 7D,24H
├❒┃➢  allreq
├❒┃➢  updategname
├❒┃➢  updategdesc
├❒┃➢  joinrequests
├❒┃➢  senddm
├❒┃➢  nikal
├❒┃➢  mute
├❒┃➢  unmute
├❒┃➢  lockgc
├❒┃➢  unlockgc
├❒┃➢  invite
├❒┃➢  tag
├❒┃➢  hidetag
├❒┃➢  tagall
├❒┃➢  tagadmins
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '3': {
                title: "😄 *Fun Menu* 😄",
                content: `╭━⪨🎉 𝐅𝐔𝐍 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  shapar
├❒┃➢  rate
├❒┃➢  insult
├❒┃➢  hack
├❒┃➢  ship
├❒┃➢  character
├❒┃➢  pickup
├❒┃➢  joke
├❒┃➢  hrt
├❒┃➢  hpy
├❒┃➢  syd
├❒┃➢  anger
├❒┃➢  shy
├❒┃➢  kiss
├❒┃➢  mon
├❒┃➢  cunfuzed
├❒┃➢  setpp
├❒┃➢  hand
├❒┃➢  nikal
├❒┃➢  hold
├❒┃➢  hug
├❒┃➢  nikal
├❒┃➢  hifi
├❒┃➢  poke
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '4': {
                title: "👑 *Owner Menu* 👑",
                content: `╭━⪨👑 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  owner
├❒┃➢  menu
├❒┃➢  menu2
├❒┃➢  vv
├❒┃➢  listcmd
├❒┃➢  allmenu
├❒┃➢  repo
├❒┃➢  block
├❒┃➢  unblock
├❒┃➢  fullpp
├❒┃➢  setpp
├❒┃➢  restart
├❒┃➢  shutdown
├❒┃➢  updatecmd
├❒┃➢  alive
├❒┃➢  ping
├❒┃➢  gjid
├❒┃➢  jid
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                image: true
            },
            '5': {
                title: "🤖 *AI Menu* 🤖",
                content: `╭━⪨🤖 𝐀𝐈 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  ai
├❒┃➢  gpt3
├❒┃➢  gpt2
├❒┃➢  gptmini
├❒┃➢  gpt
├❒┃➢  meta
├❒┃➢  blackbox
├❒┃➢  luma
├❒┃➢  dj
├❒┃➢  khan
├❒┃➢  jawad
├❒┃➢  gpt4
├❒┃➢  bing
├❒┃➢  imagine
├❒┃➢  imagine2
├❒┃➢  copilot
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '6': {
                title: "🎎 *Anime Menu* 🎎",
                content: `╭━⪨🎎 𝐀𝐍𝐈𝐌𝐄 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  fack
├❒┃➢  truth
├❒┃➢  dare
├❒┃➢  dog
├❒┃➢  awoo
├❒┃➢  garl
├❒┃➢  waifu
├❒┃➢  neko
├❒┃➢  megnumin
├❒┃➢  neko
├❒┃➢  maid
├❒┃➢  loli
├❒┃➢  animegirl
├❒┃➢  animegirl1
├❒┃➢  animegirl2
├❒┃➢  animegirl3
├❒┃➢  animegirl4
├❒┃➢  animegirl5
├❒┃➢  anime1
├❒┃➢  anime2
├❒┃➢  anime3
├❒┃➢  anime4
├❒┃➢  anime5
├❒┃➢  animenews
├❒┃➢  foxgirl
├❒┃➢  naruto
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '7': {
                title: "🔄 *Convert Menu* 🔄",
                content: `╭━⪨💱 𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭────────────────·๏
├❒┃➢  sticker
├❒┃➢  sticker2
├❒┃➢  emojimix
├❒┃➢  fancy
├❒┃➢  take
├❒┃➢  tomp3
├❒┃➢  tts
├❒┃➢  trt
├❒┃➢  base64
├❒┃➢  unbase64
├❒┃➢  binary
├❒┃➢  dbinary
├❒┃➢  tinyurl
├❒┃➢  urldecode
├❒┃➢  urlencode
├❒┃➢  url
├❒┃➢  repeat
├❒┃➢  ask
├❒┃➢  readmore
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '8': {
                title: "📌 *Other Menu* 📌",
                content: `╭━⪨♻️ 𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  timenow
├❒┃➢  date
├❒┃➢  count
├❒┃➢  calculate
├❒┃➢  countx
├❒┃➢  flip
├❒┃➢  coinflip
├❒┃➢  rcolor
├❒┃➢  roll
├❒┃➢  fact
├❒┃➢  cpp
├❒┃➢  rw
├❒┃➢  pair
├❒┃➢  pair2
├❒┃➢  pair3
├❒┃➢  fancy
├❒┃➢  logo <text>
├❒┃➢  define
├❒┃➢  news
├❒┃➢  movie
├❒┃➢  weather
├❒┃➢  srepo
├❒┃➢  insult
├❒┃➢  save
├❒┃➢  wikipedia
├❒┃➢  gpass
├❒┃➢  githubstalk
├❒┃➢  yts
├❒┃➢  ytv
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '9': {
                title: "💞 *Reactions Menu* 💞",
                content: `╭━⪨🎭 𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  bully 
├❒┃➢  cuddle 
├❒┃➢  cry 
├❒┃➢  hug
├❒┃➢  awoo 
├❒┃➢  kiss 
├❒┃➢  lick 
├❒┃➢  pat 
├❒┃➢  smug 
├❒┃➢  bonk 
├❒┃➢  yeet 
├❒┃➢  blush 
├❒┃➢  smile 
├❒┃➢  wave 
├❒┃➢  highfive 
├❒┃➢  handhold 
├❒┃➢  nom 
├❒┃➢  bite 
├❒┃➢  glomp 
├❒┃➢  slap 
├❒┃➢  kill 
├❒┃➢  happy 
├❒┃➢  wink 
├❒┃➢  poke 
├❒┃➢  dance 
├❒┃➢  cringe 
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            },
            '10': {
                title: "🏠 *Main Menu* 🏠",
                content: `╭━⪨👻 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔 ⪩━┈⊷
├❒╭───────────────·๏
├❒┃➢  ping
├❒┃➢  ping2
├❒┃➢  speed
├❒┃➢  live
├❒┃➢  alive
├❒┃➢  runtime
├❒┃➢  uptime
├❒┃➢  repo
├❒┃➢  owner
├❒┃➢  menu
├❒┃➢  menu2
├❒┃➢  restart
├❒╰───────────────┈⊷
╰━━━━━━━━━━━━━━━━━┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɪᴋᴏ ᴍᴅx*`,
                image: true
            }
        };

        // Message handler with improved error handling
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                
                if (isReplyToMenu) {
                    const receivedText = receivedMsg.message.conversation || 
                                      receivedMsg.message.extendedTextMessage?.text;
                    const senderID = receivedMsg.key.remoteJid;

                    if (menuData[receivedText]) {
                        const selectedMenu = menuData[receivedText];
                        
                        try {
                            if (selectedMenu.image) {
                                await conn.sendMessage(
                                    senderID,
                                    {
                                        image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/7y24v8.jpg' },
                                        caption: selectedMenu.content,
                                        contextInfo: contextInfo
                                    },
                                    { quoted: receivedMsg }
                                );
                            } else {
                                await conn.sendMessage(
                                    senderID,
                                    { text: selectedMenu.content, contextInfo: contextInfo },
                                    { quoted: receivedMsg }
                                );
                            }

                            await conn.sendMessage(senderID, {
                                react: { text: '✅', key: receivedMsg.key }
                            });

                        } catch (e) {
                            console.log('Menu reply error:', e);
                            await conn.sendMessage(
                                senderID,
                                { text: selectedMenu.content, contextInfo: contextInfo },
                                { quoted: receivedMsg }
                            );
                        }

                    } else {
                        await conn.sendMessage(
                            senderID,
                            {
                                text: `❌ *Invalid Option!* ❌\n\nPlease reply with a number between 1-10 to select a menu.\n\n*Example:* Reply with "1" for Download Menu\n\n> ${config.DESCRIPTION}`,
                                contextInfo: contextInfo
                            },
                            { quoted: receivedMsg }
                        );
                    }
                }
            } catch (e) {
                console.log('Handler error:', e);
            }
        };

        // Add listener
        conn.ev.on("messages.upsert", handler);

        // Remove listener after 5 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error('Menu Error:', e);
        try {
            await conn.sendMessage(
                from,
                { text: `❌ Menu system is currently busy. Please try again later.\n\n> ${config.DESCRIPTION}` },
                { quoted: mek }
            );
        } catch (finalError) {
            console.log('Final error handling failed:', finalError);
        }
    }
});
                  
                  
