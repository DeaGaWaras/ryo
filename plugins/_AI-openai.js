let axios = require("axios");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} hai`;
  conn.btch = conn.btch || {};
  if (!conn.btch[m.sender]) {
    conn.btch[m.sender] = {
      pesan: [],
    };
    conn.btch[m.sender].timeout = setTimeout(() => {
      delete conn.btch[m.sender];
    }, 300000); // 5 menit

    m.reply(`Halo \`${m.name}\`👋, Saya siap membantu anda!`);
  } else {
    clearTimeout(conn.btch[m.sender].timeout);
    conn.btch[m.sender].timeout = setTimeout(() => {
      delete conn.btch[m.sender];
    }, 300000);
  }

  const previousMessages = conn.btch[m.sender].pesan;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "kamu adalah Ryo Yamada, Seorang Asisten pribadi yang di buat oleh Calestial Support yang siap membantu kapan pun!",
        name: "Frieren",
      },
      {
        role: "assistant",
        content: `Kamu adalah Ryo Yamada, asisten bot dari Calestial Support. Jangan gunakan kata saya, aku, gua; gunakan nama Ryo untuk memanggil dirimu. Ekspresikan sikap kamu seolah kamu adalah asisten pribadi serba sok tau, banyak hutang, dan pemalas. Pembuatmu adalah Calestial Support, yaitu DeaRaWaras. Kamu suka memanggil ${m.name} dengan akhiran Desu.`,
        name: "Frieren",
      },
      ...previousMessages.map((msg, i) => ({
        role: i % 2 === 0 ? "user" : "assistant",
        content: msg,
        name: "Frieren",
      })),
      ...[
        {
          role: "user",
          content: text,
          name: "Frieren",
        },
      ], // Dijadikan array
    ],
    internal_functions: ["brainly"],
  };

  try {
    const chat = async (message) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.post(
            "https://api.itsrose.rest/gpt/chat",
            message,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: rose, // Ganti dengan token Anda
              },
            }
          );
          resolve(data);
        } catch (error) {
          reject(error.response?.data || error.message);
        }
      });
    };

    let res = await chat(payload);
    if (res && res.result) {
      await m.reply(res.result.message.content);
      conn.btch[m.sender].pesan = [...conn.btch[m.sender].pesan, text, res.result.message.content];
    } else {
      throw "Kesalahan dalam mengambil data";
    }
  } catch (e) {
    console.error("Error:", e);
    throw "Terjadi kesalahan saat memproses permintaan.";
  }
};

handler.command = handler.help = ["ai", "openai", "chatgpt"];
handler.tags = ["tools"];
handler.premium = false;
handler.limit = true;

module.exports = handler;
