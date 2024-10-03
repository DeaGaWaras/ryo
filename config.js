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
global.wm = '© Anna'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Calestial Support'
global.autobio = false // Set true untuk mengaktifkan autobio
global.maxwarn = '5' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.btc = 'LXCG3aVX' 
//Daftar terlebih dahulu https://api.botcahx.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = 'JDgbMuvq'
//Daftar https://api.betabotz.eu.org 

global.rose = 'Rk-SarulBelatungPadang123'

global.APIs = {   
  btc: 'https://api.botcahx.eu.org',
  widipe: 'https://widipe.com',
  rose: 'https://api.itsrose.rest'
}
global.APIKeys = { 
  'https://api.botcahx.eu.org': 'LXCG3aVX' 
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
