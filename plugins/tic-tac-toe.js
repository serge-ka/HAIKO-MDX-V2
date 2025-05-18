const games = {};
const { cmd } = require("../command");

const getBoard = (b) => {
  return `
${b[0]} | ${b[1]} | ${b[2]}
---------
${b[3]} | ${b[4]} | ${b[5]}
---------
${b[6]} | ${b[7]} | ${b[8]}
`.trim();
};

const checkWin = (b, sym) => {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a,b1,c]) => b[a] === sym && b[b1] === sym && b[c] === sym);
};

const isFull = (b) => b.every(x => x === "❌" || x === "⭕");

cmd({
  pattern: "ttt",
  desc: "Start or play Tic Tac Toe",
  category: "game",
  filename: __filename
}, async (conn, m, store, { from, reply, args, mentionByTag }) => {
  const currentGame = games[from];

  // Start new game
  if (!args[0]) {
    if (currentGame) return reply("❎ A game is already in progress in this group.");
    
    const playerX = m.sender;
    const playerO = mentionByTag[0];
    if (!playerO) return reply("❎ Mention a player to start.\n*Example:* .ttt @user");

    games[from] = {
      board: ["1","2","3","4","5","6","7","8","9"],
      players: { X: playerX, O: playerO },
      turn: "X"
    };

    const boardText = getBoard(games[from].board);
    await conn.sendMessage(from, {
      text: `🎮 *Tic Tac Toe*\n\n${boardText}\n\nIt's @${playerX.split("@")[0]}'s turn (❌)\nReply to this message with *.ttt [1-9]* to play.`,
      mentions: [playerX, playerO]
    }, { quoted: m });

  } else {
    // Play move
    if (!currentGame) return reply("❎ No game in progress. Start one with .ttt @user");

    const position = parseInt(args[0]) - 1;
    if (isNaN(position) || position < 0 || position > 8) return reply("❎ Choose a valid number between 1 and 9.");

    const symbol = currentGame.turn;
    const player = currentGame.players[symbol];

    if (m.sender !== player) return reply("❎ It's not your turn.");
    if (["❌", "⭕"].includes(currentGame.board[position])) return reply("❎ That cell is already taken.");

    currentGame.board[position] = symbol === "X" ? "❌" : "⭕";

    const boardText = getBoard(currentGame.board);

    if (checkWin(currentGame.board, currentGame.board[position])) {
      await conn.sendMessage(from, {
        text: `🎉 *Victory!*\n\n${boardText}\n\nWinner: @${m.sender.split("@")[0]}`,
        mentions: [m.sender]
      }, { quoted: m });
      delete games[from];
      return;
    }

    if (isFull(currentGame.board)) {
      await conn.sendMessage(from, {
        text: `🤝 *Draw!*\n\n${boardText}`
      }, { quoted: m });
      delete games[from];
      return;
    }

    currentGame.turn = symbol === "X" ? "O" : "X";
    const nextPlayer = currentGame.players[currentGame.turn];
    await conn.sendMessage(from, {
      text: `🎮 *Tic Tac Toe*\n\n${boardText}\n\nIt's @${nextPlayer.split("@")[0]}'s turn (${currentGame.turn === "X" ? "❌" : "⭕"})\nReply with *.ttt [1-9]*`,
      mentions: [nextPlayer]
    }, { quoted: m });
  }
});


cmd({
  pattern: 'delttt',
  alias: ['cancelttt', 'stopttt'],
  desc: 'Annule une partie de Tic Tac Toe en cours.',
  category: 'games',
  react: '🗑️',
  filename: __filename
}, async (conn, mek, m, { from, isGroup, isAdmins, reply }) => {
  if (!isGroup) return reply('❌ Cette commande ne peut être utilisée que dans les groupes.');
  if (!isAdmins) return reply('❌ Seuls les admins peuvent annuler une partie.');

  if (!games.has(from)) return reply('⚠️ Il n’y a aucune partie en cours dans ce groupe.');

  games.delete(from);
  reply('✅ Partie de *Tic Tac Toe* annulée avec succès.');
});
