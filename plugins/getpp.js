const fs = require("fs");
const config = require("../config");
const { cmd, commands } = require("../command");
const path = require('path');
const axios = require("axios");


cmd({
    pattern: "getpp",
    desc: "*ғᴇᴛᴄʜ ᴛʜᴇ ᴘʀᴏғɪʟᴇ ᴘɪᴄᴛᴜʀᴇ ᴏғ ᴀ ᴛᴀɢɢᴇᴅ ᴏʀ ʀᴇᴘʟɪᴇᴅ ᴜsᴇʀ.*",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { quoted, isGroup, sender, participants, reply }) => {
    try {
        // Determine the target user
        const targetJid = quoted ? quoted.sender : sender;

        if (!targetJid) return reply("*⚠️ ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇssᴀɢᴇ ᴛᴏ ғᴇᴛᴄʜ ᴛʜᴇ ᴘʀᴏғɪʟᴇ ᴘɪᴄᴛᴜʀᴇ.*");

        // Fetch the user's profile picture URL
        const userPicUrl = await conn.profilePictureUrl(targetJid, "image").catch(() => null);

        if (!userPicUrl) return reply("*⚠️ ɴᴏ ᴘʀᴏғɪʟᴇ ᴘɪᴄᴛᴜʀᴇ ғᴏᴜɴᴅ ғᴏʀ ᴛʜᴇ sᴘᴇᴄɪғɪᴇᴅ ᴜsᴇʀ.*");

        // Send the user's profile picture
        await conn.sendMessage(m.chat, {
            image: { url: userPicUrl },
            caption: "*🖼️ ʜᴇʀᴇ ɪs ᴛʜᴇ ᴘʀᴏғɪʟᴇ ᴘɪᴄᴛᴜʀᴇ ᴏғ ᴛʜᴇ sᴘᴇᴄɪғɪᴇᴅ ᴜsᴇʀ.*"
        });
    } catch (e) {
        console.error("Error fetching user profile picture:", e);
        reply("*❌ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ғᴇᴛᴄʜɪɴɢ ᴛʜᴇ ᴘʀᴏғɪʟᴇ ᴘɪᴄᴛᴜʀᴇ. ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*");
    }
});
