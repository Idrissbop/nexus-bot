import  fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
  let response = args.join(' ').split('|')
  if (!args[0]) throw '*_أكتب نص مع هاذا الأمر لإنشاء لوغو_*\n\n *مثال الإستخدام*\n .logo-coffee Nexus-Bot'
  m.reply('*_جارى إنشاء لوغو لك قريبا ..._*')
  let res = `https://api.tiodevhost.my.id/api/photooxy/coffee-cup?text=${response[0]}`
  conn.sendFile(m.chat, res, 'coffee-cu.jpg', `> _Nexus-Bot LOGO_ \n\n www.instagram.com/zexx0.2`, m, false)
}
handler.help = ['logo-coffee'].map(v => v + ' <text>')
handler.tags = ['maker'']
handler.command = /^(logo-coffee)$/i

export default handler
