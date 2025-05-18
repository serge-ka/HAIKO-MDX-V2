const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "chatbot",
    alias: ["cb", "chatjs", "talk"],
    desc: "Talk with a JavaScript-based chatbot",
    category: "ai",
    react: "💬",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please enter a message to send to the chatbot.\nExample: `.chatbot Hello`");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/chatbot?message=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.response) {
            await react("❌");
            return reply("The chatbot did not return a response. Try again later.");
        }

        await reply(`💬 *Chatbot Reply:*\n\n${data.response}`);
        await react("✅");
    } catch (e) {
        console.error("Error in chatbot command:", e);
        await react("❌");
        reply("An error occurred while communicating with the chatbot.");
    }
});
