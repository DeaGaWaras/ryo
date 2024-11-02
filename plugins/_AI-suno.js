const axios = require('axios');

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `🚩 *Masukan detail untuk lirik lagu!*`;

  const msg = await conn.sendMessage(
    m.chat,
    { text: "_Preparing Suno Request_" },
    { quoted: m }
  );

  const parts = text.split(',').map(part => part.trim());

  // Jika kurang dari 3 bagian, tambahkan placeholder kosong
  while (parts.length < 3) {
    parts.push("");
  }

  // Menampilkan hasil dalam format yang diinginkan
  const [judul, deskripsi, tag] = parts;

  const payloads = {
    title: judul,
    tags: deskripsi,
    prompt: tag, // Text or lyrics provided by the user
    instrumental: false
  };

  try {
    const { data } = await axios.request({
      baseURL: "https://internal-api.lovita.io",
      url: "/suno/advance",
      method: "POST",
      headers: {
        'Authorization': rose,
        'Content-Type': 'application/json'
      },
      data: payloads,
    });

    const { status, message, result } = data;

    if (!status) {
      await conn.sendMessage(m.chat, {
        text: message,
        edit: { ...msg.key },
      });
      return;
    }

    // Log result for debugging
    console.log("Suno API Result: ", result);

    for (const item of result) {
      const { id, status, created_at, prompt_description, output, meta, error } = item;

      if (output && output.audio) {
        await conn.sendMessage(m.chat, {
          audio: { url: output.audio },
          mimetype: 'audio/mpeg',
          caption: `*Title*: ${meta.title || 'N/A'}\n*Tags*: ${meta.tags || 'N/A'}\n*Duration*: ${meta.duration || 'N/A'} seconds\n*Status*: ${status}\n*Created At*: ${created_at}`,
        }, { quoted: m });
      } else if (error && error.message) {
        await conn.sendMessage(m.chat, {
          text: `🚩 Error: ${error.message}`,
          edit: { ...msg.key },
        });
      } else {
        await conn.sendMessage(m.chat, {
          text: "🚩 Tidak ada output audio yang dihasilkan.",
          edit: { ...msg.key },
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    m.reply("Terjadi kesalahan dalam memproses permintaan.");
  }
};

handler.help = ["suno"];
handler.command = ["suno"];
handler.tags = ['tools'];
handler.limit = true;
module.exports = handler;
