const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

async function handler(m, { conn, usedPrefix, command }) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);

      // URL dan headers untuk API POST
      const url = `https://api.itsrose.rest/image/esrgan`;
      const headers = {
        'accept': 'application/json',
        'Authorization': 'Rk-SaruulBelatungPadang',
        'Content-Type': 'application/json',
      };

      // Body request
      const body = JSON.stringify({
        "init_image": out,
        "json": true,
        "algo": "esrgan"
      });

      // Mengirim permintaan POST
      const api = await fetch(url, {
        method: 'POST',
        headers,
        body
      });
      const response = await api.json();

      // Memproses hasil base64 menjadi buffer jika berhasil
      if (response.status && response.result && response.result.base64Image) {
        const buffer = Buffer.from(response.result.base64Image, 'base64');
        conn.sendFile(m.chat, buffer, 'enhanced-image.jpg', wm, m);
      } else {
        m.reply(`Gambar tidak ditemukan di respons API.`);
      }
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`Identifikasi gagal. Silakan coba lagi.`);
  }
}

handler.help = ['remini'];
handler.tags = ['tools'];
handler.command = ['remini'];
handler.premium = true;
handler.limit = false;

module.exports = handler;
