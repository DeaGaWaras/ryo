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
 
  **Daftar Character:**  
  1. Aglaea  
  2. Arlan  
  3. Argenti  
  4. Asta  
  5. Bailu  
  6. BlackSwan  
  7. Blade  
  8. Boothill  
  9. Bronya  
  10. Clara  
  11. Danheng  
  12. Danhengil  
  13. DrRatio  
  14. Fei Xiao  
  15. Feixiao  
  16. Fugue  
  17. Fuxuan  
  18. Gepard  
  19. Guinafen  
  20. Hanya  
  21. Herta  
  22. Himeko  
  23. Hook  
  24. HuoHuo  
  25. Jade  
  26. JingLiu  
  27. Jingyuan  
  28. Kafka  
  29. Lingsha  
  30. Luka  
  31. Luocha  
  32. Lynx  
  33. March  
  34. Misha  
  35. Moze  
  36. Natasha  
  37. Pela  
  38. Qingque  
  39. Rappa  
  40. Robin  
  41. RuanMei  
  42. Sampo  
  43. Seele  
  44. Serval  
  45. Silverwolf  
  46. Sparkle  
  47. Sushang  
  48. Tingyun  
  49. Topaz  
  50. Trailblazerfire  
  51. Trailblazerimaginary  
  52. Trailblazerphysical  
  53. Welt  
  54. Xueyi  
  55. Yanqing  
  56. Yukong  
  57. Yunli`;

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
      "moze",
      "aglaea",
      "feixiao",
      "fugue",
      "lingsha",
      "rappa",
      "yunli",
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
      "Aglaea",
      "FeiXiao",
      "Fugue",
      "LingSha",
      "Rappa",
      "YunLi",
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
