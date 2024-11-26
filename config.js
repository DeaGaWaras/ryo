global.owner = ['6283117436733']  
global.mods = ['6283117436733'] 
global.prems = ['6283117436733']
global.nameowner = 'DeaGaWaras'
global.numberowner = '6283117436733' 
global.botname = 'Ryo Yamada'
global.numberbot = "6285791467641"
global.mail = 'support@Dea.SukaSusu' 
global.gc = 'https://chat.whatsapp.com/ClTnd1QeIxl5Kku29sRQhx'
global.instagram = 'https://instagram.com/syh.dea'
global.website = 'https://calestial.shop'
global.wm = 'Calestial Support'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Calestial Support'
global.autobio = false // Set true untuk mengaktifkan autobio
global.maxwarn = '5' // Peringatan maksimum
global.antiporn = false // Auto delete pesan porno (bot harus admin)

//INI WAJIB DI ISI!//
global.btc = '670cf13b5aabea64c24c' 
//Daftar terlebih dahulu https://api.botcahx.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = 'JDgbMuvq'
//Daftar https://api.betabotz.eu.org 

global.rose = 'Prod-Sk-d39d5bad8869e9b5e39e275330c08345'
global.lovita = 'Bearer Prod-Sk-d39d5bad8869e9b5e39e275330c08345'

global.APIs = {   
  btc: 'https://api.botcahx.eu.org',
  widipe: 'https://widipe.com',
  rose: 'https://api.itsrose.rest'
}
global.APIKeys = { 
  'https://api.botcahx.eu.org': '670cf13b5aabea64c24c' 
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
