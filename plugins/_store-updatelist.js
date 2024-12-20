const upload = require('../lib/uploadImage');

let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Uhm.. apa yang mau diupdate?\n\nContoh\n${usedPrefix}${command} key | value`;

    let groupData = global.db.data.chats[message.chat];
    if (!groupData.store) groupData.store = [];

    let storeList = groupData.store;
    if (!storeList[0]) throw `Belum ada list di grup ini!\nUntuk menambahkan, ketik *${usedPrefix}addlist*`;

    let [key, value] = text.split('|').map(v => v.trim());
    let quotedMessage = message.quoted ? message.quoted : message;
    let mimetype = quotedMessage.mimetype || quotedMessage.mediaType || '';
    let mediaData = mimetype ? await quotedMessage.download() : null;
    let imageUrl = mediaData ? await upload(mediaData) : null;

    let updated = false;

    Object.keys(storeList).forEach((index) => {
        let item = storeList[index];
        if (item.id === message.chat && item.key === key) {
            storeList[index].key = key;
            storeList[index].value = value;
            storeList[index].isImage = !!mimetype;
            storeList[index].imageUrl = imageUrl;
            updated = true;
        }
    });

    if (updated) {
        conn.reply(message.chat, `Berhasil update *${key}* dalam daftar list!`);
    } else {
        throw `Maaf, *${text}* tidak ditemukan di list!\nKetik *${usedPrefix}liststore* untuk melihat list-nya.`;
    }
};

handler.help = ['updatelist'];
handler.tags = ['store'];
handler.command = /^updatelist$/i;
handler.admin = true;
handler.group = true;

module.exports = handler;
