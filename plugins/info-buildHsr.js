const { Buffer } = require("buffer");

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Use example ${usedPrefix}${command} raiden shogun`;
  const sender = m.sender;
  const parameter = text.trim();

  async function levenshteinDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    const dp = [];
    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else {
          const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
        }
      }
    }
    return dp[m][n];
  }

  // Fungsi untuk menemukan kata terdekat
  async function findClosestDistance(word, dictionary) {
    let minDistance = Infinity;
    let mostSimilarWord = "";

    for (const dictWord of dictionary) {
      const distance = await levenshteinDistance(word, dictWord);
      if (distance < minDistance) {
        minDistance = distance;
        mostSimilarWord = dictWord;
      }
    }
    return mostSimilarWord;
  }

  let teks = `Silahkan Gunakan command dibawah
  Example: *!buildhsr kafka*
  
 *Daftar Character:*
1. Arlan
2. Argenti
3. Asta
4. Bailu
5. BlackSwan
6. Blade
7. Boothill
8. Bronya
9. Clara
10. Danheng
11. Danhengil
12. DrRatio
13. Fei Xiao
14. Fuxuan
15. Gepard
16. Guinafen
17. Hanya
18. Herta
19. Himeko
20. Hook
21. HuoHuo
22. Jade
23. JingLiu
24. Jingyuan
25. Kafka
26. Luka
27. Luocha
28. Lynx
29. March
30. Misha
31. Moze
32. Natasha
33. Pela
34. Qingque
35. Robin
36. RuanMei
37. Sampo
38. Seele
39. Serval
40. Silverwolf
41. Sparkle
42. Sushang
43. Tingyun
44. Topaz
45. Trailblazerfire
46. Trailblazerimaginary
47. Trailblazerphysical
48. Welt
49. Xueyi
50. Yanqing
51. Yukong`;

  try {
    const dictionary = [
      "archeron",
      "argenti",
      "arlan",
      "asta",
      "bailu",
      "blade",
      "blackswan",
      "bronya",
      "clara",
      "danheng",
      "danhengimbibitorlunae",
      "drratio",
      "fuxuan",
      "gepard",
      "guinafen",
      "hanya",
      "herta",
      "himeko",
      "hook",
      "huohuo",
      "jingliu",
      "jingyuan",
      "kafka",
      "luka",
      "luocha",
      "lynx",
      "march",
      "misha",
      "natasha",
      "pela",
      "qingque",
      "ruanmei",
      "sampo",
      "seele",
      "serval",
      "silverwolf",
      "sparkle",
      "sushang",
      "tingyun",
      "topaz",
      "trailblazerfire",
      "trailblazerphysical",
      "trailblazerimaginary",
      "welt",
      "xueyi",
      "yanqing",
      "yukong",
      "boothill",
      "robin",
      "jade",
      "feixiao",
      "moze"
    ];

    const name = [
      "Argenti",
      "Archeron",
      "Arlan",
      "Asta",
      "Aventurine",
      "Bailu",
      "Blade",
      "BlackSwan",
      "Bronya",
      "Boothill",
      "Clara",
      "DanHengImbibitorLunae",
      "Danheng",
      "Danhengil",
      "DrRatio",
      "Fu xuan",
      "Gallagher",
      "Gepard",
      "Guinafen",
      "Hanya",
      "Herta",
      "Himeko",
      "Hook",
      "HuoHuo",
      "Jing Liu",
      "Jing yuan",
      "Kafka",
      "Luka",
      "Luocha",
      "Lynx",
      "March 7th",
      "Misha",
      "Natasha",
      "Pela",
      "Qingque",
      "Ruan Mei",
      "Sampo",
      "Seele",
      "Serval",
      "Silver Wolf",
      "Sparkle",
      "Sushang",
      "Tingyun",
      "Topaz",
      "Trailblazer Fire",
      "Trailblazer Physical",
      "Trailblazer Imaginary",
      "Welt",
      "Xue yi",
      "Yanqing",
      "Yukong",
      "Robin",
      "Jade",
      "Fei Xiao",
      "Moze",
    ];

    const correctedWord = await findClosestDistance(parameter, dictionary);
    const index = dictionary.indexOf(correctedWord);

    if (index !== -1) {
      const korekname = name[index];
      const namek = await findClosestDistance(parameter, name);
      console.log("Build Honkai Star: Rail " + namek);
      const res = `https://DeaGaWaras.github.io/HonkaiStarRail/${correctedWord}.jpeg`;
      const buffer = Buffer.from(res);
      await conn.sendMessage(
        m.chat,
        {
          image: { url: res },
          caption: "Build Honkai Star: Rail " + namek,
        },
        { quoted: m }
      );
    } else {
      console.error(
        "Terjadi kesalahan: Karakter tidak ditemukan dalam daftar."
      );
      m.reply(`Karakter Tidak Ditemukan\n${teks}`);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    m.reply(`Karakter Tidak Ditemukan\n${teks}`);
  }
};

// Mendefinisikan handler command
handler.command = handler.help = ["hsrbuild", "buildhsr"];
handler.tags = ["info"];
handler.limit = true;
module.exports = handler;
