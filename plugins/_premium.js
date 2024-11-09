let fetch = require('node-fetch')
let handler = async (m, { text, command, conn }) => {
    try {
        
        let caption = `✨ *_[Price Calestials]_ ✨_  
💥 TINGKATKAN KEASYIKAN GRUP ANDA dengan fitur-fitur eksklusif kami! 💥  
📢 *Promo Terbatas! Akses Premium mulai dari 5 Ribu saja!*

📦 **Price Premium Calestials**  
________________________________  
   
💸 **Harga Premium:**  
✨ *7 Hari*: Rp 5.000  
✨ *1 Bulan*: Rp 12.000  
✨ *2 Bulan*: Rp 20.000 - **Diskon 10%** untuk pembelian 2 bulan  
✨ *3 Bulan*: Rp 30.000 - **Diskon 15%** untuk pembelian 3 bulan  
✨ *Permanen*: Rp 115.000 - *Bonus akses ke konten premium, pembaruan rutin, dan lebih banyak fitur eksklusif!*  

📣 **Fitur Unggulan Premium:**  
- 🔹 *Selamat Datang & Pesan Perpisahan*  
- 🔹 *Pencarian & Edit Gambar AI*  
- 🔹 *Unduhan Video dari YouTube, TikTok, IG, dan FB*  
- 🔹 *Kustomisasi Fitur Bot*  
- 🔹 Dan masih banyak lagi yang bikin grup makin seru!  

⚡ **Keuntungan Pilihan Premium:**  
- Buat Meme & Hiburan Seru  
- Perbarui Grup Tanpa Batas!  
- Game RPG untuk Usir Kebosanan  
- Nikmati Fitur Eksklusif dan Bebas Limit!  

📦 **Keuntungan Paket Permanen:**  
1. Tambahkan Bot ke Grup Bebas Sesuka Hati  
2. Bagikan Premium ke 5 Teman Anda Selama 1 Bulan  
3. Dapatkan Kustomisasi Bot Eksklusif  

📲 **Hubungi & Pesan Sekarang!**  
Tertarik? Langsung hubungi kami di: wa.me/6283117436733  
Pembayaran mudah via Saweria, Dana, Ovo, atau Mobile Banking.  

💬 *Jadikan Grup Anda Pusat Hiburan dengan Premium Calestials!*  
🔗 *Hubungi sekarang dan nikmati promo spesialnya!*  
`

        await conn.relayMessage(m.chat, {
            extendedTextMessage:{
                text: caption, 
                contextInfo: {
                     externalAdReply: {
                        title: `Premium Calestails`,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://im.gurl.eu.org/file/8a20f8a847138a7b787b8-a61210870d8fd79624.png',
                        sourceUrl: 'https://calestial.shop/qr'
                    }
                }, mentions: [m.sender]
}}, {})
    } catch (e) {
        console.log(e)
        m.reply('Terjadi kesalahan, silahkan coba lagi nanti')
    }
}
handler.command = handler.help = ['premium', 'prem']
handler.tags = ['tools']
handler.premium = false
handler.limit = false

module.exports = handler