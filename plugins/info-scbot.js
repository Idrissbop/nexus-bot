import { promises } from 'fs'
import { join } from 'path'

let handler = async function (m, { conn, __dirname }) {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  
m.reply(`  
*≡ السكريبت: Nexus-Bot*  
*Nexus-Bot هو بوت وسكريبت API يتخصص في إرسال التطبيقات والأغاني ومقاطع الفيديو وغيرها من المحتويات المتعلقة بالهاتف وتطبيقاته.*  

*▢ يمكنك الحصول على السكريبت من هنا:* 

*[رابط السكريب]*
https://www.https://github.com/Idrissbop/nexus-bot

`.trim())
    
}

handler.help = ['script']
handler.tags = ['tools']
handler.command = ['sc', 'git', 'script'] 

export default handler
