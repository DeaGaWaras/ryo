const uploadImage = require('../lib/uploadImage');

const handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `Apa yang ingin ditambahkan?\n\n*Contoh:* ${usedPrefix + command} key | response`;
  }

  if (!text.includes('|')) {
    throw `Apa yang ingin ditambahkan?\n\n*Contoh:* ${usedPrefix + command} key | response`;
  }

  let store = global.db.data.store[message.chat] || (global.db.data.store[message.chat] = []);

  let [key, response] = text.split('|');
  const existingItem = store.some(item => item.id === message.chat && item.key === key);

  if (existingItem) {
    throw `Error! *${key}* sudah terdaftar di daftar store!`;
  }

  try {
    let media = message.quoted || message;
    let mimeType = media.mimetype || media.mediaType || '';
    let imageBuffer = mimeType ? await media.download() : null;
    let imageUrl = imageBuffer ? await uploadImage(imageBuffer) : null;

    let newItem = {
      id: message.chat,
      key,
      response,
      isImage: !!mimeType,
      imageUrl
    };

    store.push(newItem);

    message.reply(`Sukses!\n\nMenambahkan item\n|-- ${key} --|\nke daftar store`);
  } catch (error) {
    console.error(error);
    throw 'Terjadi kesalahan saat menambahkan item ke store.';
  }
};

handler.tags = ['store'];
handler.command = /^add(list|store)$/i;
handler.admin = true;
handler.group = true;
handler.owner = true;

module.exports = handler;
