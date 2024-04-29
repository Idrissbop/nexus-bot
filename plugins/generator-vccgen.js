import fetch from "node-fetch";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    if (!text) throw '*هاذا الأمر يقوم بتوليد فيزات وهمية*\n*مثال:* ' + usedPrefix + command + ' 516088';
    try {
        const result = await GenerateCC(text)
        const formattedList = result.map((card, index) => `- *البطاقة ${index + 1}:*\n رمز بطاقة : ${card.CardNumber}\n  التاريخ: ${card.ExpirationDate}\n  رقم بطاقة: ${card.CVV}`).join('\n\n');
        await m.reply(formattedList);
    } catch (e) {
        await m.reply('Error occurred');
    }
}
handler.help = ['vccgen'].map(v => v + ' (query)')
handler.tags = ['tools']
handler.command = /^(vccgen)$/i
handler.limit = true
export default handler

async function GenerateCC(query) {
    try {
        const response = await fetch("https://tools.revesery.com/vcc/revesery.php?bin=" + parseInt(query), {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data.");
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const cards = [];
        $('hr').each((index, element) => {
            const [cardNumber, expirationDate, cvv] = $(element).prevAll('p').map((i, el) => $(el).text().split(': ')[1]);
            cards.push({
                CardNumber: cardNumber,
                ExpirationDate: expirationDate,
                CVV: cvv
            });
        });

        return cards;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to perform the search");
    }
}