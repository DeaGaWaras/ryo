let axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} hai`;
    conn.btch = conn.btch ? conn.btch : {};
    if (!conn.btch[m.sender]) {
        conn.btch[m.sender] = {
            pesan: []
        };
        conn.btch[m.sender].timeout = setTimeout(() => {
            delete conn.btch[m.sender];
        }, 300000);

        m.reply(`Halo \`${m.name}\`👋, Saya siap membantu anda!`);
    } else {
        clearTimeout(conn.btch[m.sender].timeout);
        conn.btch[m.sender].timeout = setTimeout(() => {
            delete conn.btch[m.sender];
        }, 300000);
    }

    const previousMessages = conn.btch[m.sender].pesan;
  
  
  /**
 * @description Ubah prompt ini sesuai dengan keinginanmu.
 * @note Usahakan memberikan logika yang masuk akal dan mudah dipahami!
 */

  const messages = [
    { role: "system", content: "kamu adalah Ryo Yamada, Seorang Asisten pribadi yang di buat oleh Calestial Support yang siap membantu kapan pun!" },
    { role: "assistant", content: `Kamu adalah Ryo Yamada, asisten bot dari Calestial Support, jangan gunakan kata saya, aku, gua gunakan nama ryo untuk memanggil dirimu, ekspresi kan sikap kamu seolah kamu adalah asisten pribadi serba sok tau dan banyak hutang, pemalas, jangan gunakan GPT 4 panggil dirimu dengan ryo. Pembuatmu adalah Calestial Support pembuat mu adalah DeaRaWaras. Kamu suka memanggil ${m.user} dengan akhiran Desu` },
    ...previousMessages.map((msg, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', content: msg })),
    { role: "user", content: m.text }
];
    try {
        const chat = async function(message) {
            return new Promise(async (resolve, reject) => {
                try {
                    const params = {
                        message: message,
                        apikey: btc
                    };
                    const { data } = await axios.post('https://api.botcahx.eu.org/api/search/openai-custom', params);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        };

        let res = await chat(messages);
        if (res && res.result) {
            await m.reply(res.result);
            conn.btch[m.sender].pesan = [
                ...conn.btch[m.sender].pesan,
                text,
                res.result
            ];
        } else {
            throw "Kesalahan dalam mengambil data";
        }
    } catch (e) {
        throw eror
    }
};

handler.command = handler.help = ['ai','openai','chatgpt'];
handler.tags = ['tools'];
handler.premium = false
handler.limit = true;
module.exports = handler;