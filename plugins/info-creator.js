var name = global.nameowner
var numberowner = global.numberowner
var gmail = global.mail
const { 
default: 
makeWASocket,
BufferJSON,
WA_DEFAULT_EPHEMERAL, 
generateWAMessageFromContent, 
downloadContentFromMessage, 
downloadHistory, 
proto,
getMessage, 
generateWAMessageContent, 
prepareWAMessageMedia 
} = require("@adiwajshing/baileys");
var handler = async (m, {
conn
}) => {
const vcard = "BEGIN:VCARD\n" +
"VERSION:3.0\n" +
"N:Sy;Bot;;;\n" +
`FN: ${name}\n` +
"ORG:Calestial World;\n" + // the organization of the contact
"TEL;type=CELL;type=VOICE;waid=6283117436733:+62 831-1743-6733\n" + // WhatsApp ID + phone number
`EMAIL;type=INTERNET:${gmail}\n` +
"ADR:;;🇮🇩 Indonesia;;;;\n" +
`URL:${website}\n` +
"END:VCARD"
const sentMsg  = await conn.sendMessage(
    m.chat,
    { 
        contacts: { 
            displayName: 'CN', 
            contacts: [{ vcard }] 
        }
    }
)
await conn.reply(m.chat, "Itu Adalah nomor owner Bot", sentMsg)}
handler.command = handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.limit = true;
module.exports = handler;
