const moment = require('moment-timezone');

let handler = async (message, { conn, usedPrefix }) => {
    const db = global.db;
    const chatId = message.chat;
    let storeList = db.data.chats[chatId]?.store;

    if (!storeList || storeList.length === 0) {
        throw `Belum ada list store di grup ini.\nUntuk menambahkan ketik *${usedPrefix}addlist*`;
    }

    const formattedList = storeList.map(item => `⇒ ${item.key}`).join('\n');

    const getGreeting = () => {
        const hour = moment().tz('Asia/Jakarta').hour();
        if (hour >= 0 && hour < 6) return 'Selamat malam';
        if (hour >= 6 && hour < 12) return 'Selamat pagi';
        if (hour >= 12 && hour < 18) return 'Selamat siang';
        return 'Selamat sore';
    };

    const userName = message.pushName || message.name || 'Sahabat';
    let responseMessage = `*${getGreeting()} Kak ${userName} •֊•*\n\n`;
    responseMessage += 'Berikut ini adalah daftar store yang ada di grup ini:\n';
    responseMessage += formattedList;
    responseMessage += '\n\n*Silahkan Ketik Kata Kunci Tersebut*\n*Tanpa Menggunakan Tanda #!/.*';

    await message.reply(responseMessage);
};

handler.help = ['liststore'];
handler.command = ['store'];
handler.regex = /^list(store)?$/i;
handler.group = true;

module.exports = handler;
