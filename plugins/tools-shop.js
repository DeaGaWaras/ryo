async function handler(m, { conn, usedPrefix, command, args, text }) {
    let teks = `
ꕥ *_[Price Calestials]_*

🌟 **Premium Plan** 🌟  
________________________________

✨ Harga Premium:
• 7 Hari: Rp. 3.000
• 1 Bulan: Rp. 15.500
• 2 Bulan: Rp. 25.000
Diskon 10% untuk pembelian 2 bulan (Total: Rp. 22.500).
• 3 Bulan: Rp. 30.500
Diskon 15% untuk pembelian 3 bulan (Total: Rp. 25.925).
• Permanen: Rp. 125.000
Bonus: Akses eksklusif ke konten terbaru dan pembaruan reguler.


✨ **Keuntungan Premium**:  
• Akses tanpa batas ke semua fitur.  
• Fitur eksklusif yang selalu diperbarui.  
• Konten terbaru yang tidak terbatas.  
• Diskon spesial untuk langganan jangka panjang.  

✨ **Fitur-Fitur Unggulan**:  
✅ Pesan Selamat Datang & Perpisahan  
✅ Pencarian Gambar & Video  
✅ Pemrosesan Gambar dan AI Image Generation  
✅ Download Youtube, Tiktok, Instagram, dan Facebook (Mp4/Mp3)  
✅ Banyak fitur hiburan lainnya yang terus diperbarui  

📮 **Cara Order**:  
1. Hubungi pemilik melalui WhatsApp: [wa.me/6283117436733](https://wa.me/6283117436733)  
2. Pilih paket Premium sesuai kebutuhan.  
3. Lakukan pembayaran via Saweria, Dana, Ovo, atau Mobile Banking (scan QR code yang tersedia).  
4. Kirim bukti pembayaran kepada pemilik via WhatsApp.

📮 **Metode Pembayaran**:  
• **Saweria**: saweria.co/calestial  
• **Dana**: 085785243511  
• **Ovo**: 085117436733  
• **Mobile Banking**: Scan Kode QR/ https://calestial.shop/qr

💡 **Manfaat Langganan Premium**:  
• Akses eksklusif dengan berbagai pilihan durasi.  
• Diskon menarik untuk pembelian 2 atau 3 bulan.  
• Bonus: Akses ke konten terbaru dan reguler.  

🎉 **Manfaat Langganan Permanen**:  
• Bisa meng-upgrade hingga **3 grup** menjadi Premium selama **1 bulan**.  
• Bisa meng-upgrade hingga **5 teman** menjadi Premium selama **1 bulan**.  
• Opsi untuk permintaan perubahan khusus pada bot.

---`

conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: teks, 
      contextInfo: {
        externalAdReply: {
          title: `Shop Calestial`,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnail: '/media/shop.jpg',
          sourceUrl: 'https://calestial.shop/qr'
        }
      },
      mentions: [m.sender]
    }
  }, {});
}

handler.help = ['fakesize <angka>'];
handler.tags = ['tools'];
handler.command = ['fakesize'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
