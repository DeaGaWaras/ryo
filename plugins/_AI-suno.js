const axios = require('axios');

let handler = async (m, { text, usedPrefix, command }) => {

      if (!text) throw `🚩 *Masukan detail untuk lirik lagu!*\nExample ${usedPrefix + command} title, prompt, tags`;

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

        const [judul, prompt, ...tagArr] = parts;
        const tags = tagArr.join(', ');

        const payloads = {
            title: judul,
            tags: tags || '',
            prompt: prompt,
            instrumental: false
        };
        try {
        // Send initial request to generate Suno result
        const res = await axios.request({
            url: "https://api.itsrose.rest/suno/advance",
            method: "POST",
            headers: {
                'Authorization': rose,
                'Content-Type': 'application/json'
            },
            data: payloads,
        });

        if (res.data.status && res.data.result.length > 0) {
            const topId = res.data.result[0].id;

            // Check for completion status after 1 minute
            setTimeout(async () => {
                const fetchRes = await axios.get(`https://api.itsrose.rest/suno/fetch?ids=${topId}`, {
                    headers: {
                        'Authorization': 'Bearer Rk-SaruulBelatungPadang',
                        'accept': 'application/json'
                    }
                });

                if (fetchRes.data.status && fetchRes.data.result.length > 0) {
                    const hasil = fetchRes.data.result[0];
                    const { meta, output } = hasil;
                    const thumb = output.image_thumb;

                    // Format duration
                    const durasiFmt = (detik) => {
                        const jam = Math.floor(detik / 3600);
                        const menit = Math.floor((detik % 3600) / 60);
                        const detikSisa = Math.floor(detik % 60);
                        return [jam, menit, detikSisa]
                            .map(unit => String(unit).padStart(2, '0'))
                            .join(':');
                    };

                    const durasi = durasiFmt(meta.duration);
                    let teks = `*Judul:* ${meta.title}\n`;
                    teks += `*Tags:* ${meta.tags}\n`;
                    teks += `*Model:* ${meta.model}\n`;
                    teks += `*Durasi:* ${durasi}\n\n`;
                    teks += `${meta.lyric || 'Lirik tidak tersedia'}\n`;

            
                    await conn.relayMessage(m.chat, {
                      extendedTextMessage:{
                          text: teks, 
                          contextInfo: {
                               externalAdReply: {
                                  title: `🎵 Suno 🎵`,
                                  mediaType: 1,
                                  previewType: 0,
                                  renderLargerThumbnail: true,
                                  thumbnailUrl: output.image_thumb,
                                  sourceUrl: 'https://calestial.shop'
                              }
                          }, mentions: [m.sender]
          }}, {})

                    // Send audio file if available
                    await conn.sendMessage(m.chat, {
                      audio: { url: output.audio },
                      mimetype: 'audio/mpeg',
                    }, { quoted: m });
        
                } else {
                    m.reply(m.chat, fetchRes.data, m);
                }
            }, 60000);  // Wait for 1 minute before checking

        } else {
          await conn.sendMessage(m.chat, {
            text: "🚩 Error fetching audio. Please try again later.",
            edit: { ...msg.key },
          });
        }
    } catch (e) {
      console.error("Error:", e);
      m.reply("Terjadi kesalahan dalam memproses permintaan.");
    }
};

handler.help = ["suno"];
handler.command = ["suno"];
handler.tags = ['tools'];
handler.limit = false;
handler.premium = true

module.exports = handler;
