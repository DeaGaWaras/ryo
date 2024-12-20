let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) {
        throw `Uhm.. mana yang mau dihapus?\nContoh:\n*${usedPrefix}${command} Key*`;
    }

    let chatData = global.db.data.chats[message.chat];
    if (!chatData.store) {
        chatData.store = [];
    }

    let storeList = chatData.store;

    if (!storeList.length) {
        throw `Maaf, belum ada list di grup ini!`;
    }

    let targetIndex = null;
    let targetItem = null;

    // Cek apakah item yang akan dihapus ada di daftar
    await Object.keys(storeList).forEach(index => {
        if (
            storeList[index].id === message.chat &&
            storeList[index].key === text
        ) {
            targetIndex = index;
            targetItem = storeList[index];
        }
    });

    if (targetIndex !== null) {
        // Menghapus item dari daftar
        await message.reply(`Berhasil menghapus *${targetItem.key}* dari daftar list!`).then(() => {
            storeList.splice(targetIndex, 1);
        });
    } else {
        throw `*${text}* tidak ditemukan di list!\nKetik *${usedPrefix}liststore* untuk melihat listnya.`;
    }
};

handler.command = ['dellist'];
handler.tags = ['store'];
handler.help = ['dellist'];
handler.group = true;
handler.admin = true;

module.exports = handler;
