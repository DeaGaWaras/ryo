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
          dp[i][j] = j; // Penambahan karakter
        } else if (j === 0) {
          dp[i][j] = i; // Penghapusan karakter
        } else {
          const cost = word1[i - 1] === word2[j - 1] ? 0 : 1; // Biaya ganti
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // Hapus
            dp[i][j - 1] + 1, // Tambah
            dp[i - 1][j - 1] + cost // Ganti
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

  let teks = `Silakan gunakan perintah di bawah ini! Contoh: (*!buildgi Raiden*)

  **Daftar Character:**  
  1. ALHaitam  
  2. Albedo  
  3. Aloy  
  4. Amber  
  5. AmberDPS  
  6. Ayaka  
  7. Ayato  
  8. AyatoDPS  
  9. Baizhu  
  10. Barbara  
  11. Beidou  
  12. Bennett  
  13. Candace  
  14. Charlotte  
  15. Chevreuse  
  16. Chongyun  
  17. Citlali  
  18. Collei  
  19. Cyno  
  20. Dehya  
  21. Diluc  
  22. Diona  
  23. Dori  
  24. Emilie  
  25. Eula  
  26. Faruzan  
  27. Fischl  
  28. Freminet  
  29. Furina  
  30. Ganyu  
  31. Ganyu_Freeze  
  32. Ganyu_Melt  
  33. Gaming  
  34. Gorou  
  35. Heizou  
  36. HuTao  
  37. Itto  
  38. Jean  
  39. Kaeya  
  40. KaeyaDPS  
  41. Kachina  
  42. Kaveh  
  43. Kazuha  
  44. Keqing_Electro  
  45. Keqing_Physical  
  46. Kinich  
  47. Kirara  
  48. Klee  
  49. Kokomi  
  50. LanYan  
  51. Layla  
  52. Lisa  
  53. Lynette  
  54. Lyney  
  55. Mavuika  
  56. Mika  
  57. Mona  
  58. Mona_Freeze  
  59. Mona_Nuke  
  60. Mualani  
  61. Nahida  
  62. Navia  
  63. Neuvillette  
  64. Ningguang  
  65. NingguangDPS  
  66. Nilou  
  67. Noelle  
  68. Qiqi  
  69. Raiden  
  70. Razor  
  71. Rosaria  
  72. Sara  
  73. Sayu  
  74. Sethos  
  75. Shenhe  
  76. Shinobu  
  77. Sigewinne  
  78. Sucrose  
  79. Tartaglia  
  80. Thoma  
  81. Tighnari  
  82. Traveler_Anemo  
  83. Traveler_Dendro  
  84. Traveler_Electro  
  85. Traveler_Geo  
  86. Venti  
  87. Wanderer  
  88. Wriothesley  
  89. Xiangling  
  90. XianglingDPS  
  91. Xiao  
  92. XiaoDPS  
  93. Xianyun  
  94. Xilonen  
  95. Xingqui  
  96. Xinyan  
  97. Yae  
  98. Yanfei  
  99. YaoYao  
  100. Yelan  
  101. Yoimiya  
  102. YunJin  
  103. Zhongli`;

  try {
    const dictionary = [
      "Albedo",
      "ALHaitam",
      "Aloy",
      "Amber",
      "AmberDPS",
      "Ayaka",
      "Ayato",
      "AyatoDPS",
      "Barbara",
      "Baizhu",
      "Beidou",
      "Bennett",
      "Candace",
      "Charlotte",
      "Chevreuse",
      "Chongyun",
      "Collei",
      "Cyno",
      "Dehya",
      "Diluc",
      "Diona",
      "Dori",
      "Eula",
      "Faruzan",
      "Fischl",
      "Freminet",
      "Furina",
      "Ganyu",
      "Ganyu_Freeze",
      "Ganyu_Melt",
      "Gorou",
      "Heizou",
      "HuTao",
      "Itto",
      "Jean",
      "Kazuha",
      "Kaeya",
      "KaeyaDPS",
      "Kaveh",
      "Keqing_Electro",
      "Keqing_Physical",
      "Kirara",
      "Klee",
      "Kokomi",
      "Layla",
      "Lisa",
      "Lynette",
      "Lyney",
      "Mika",
      "Mona",
      "Mona_Freeze",
      "Mona_Nuke",
      "Nahida",
      "Navia",
      "Neuvillette",
      "Ningguang",
      "NingguangDPS",
      "Nilou",
      "Noelle",
      "Qiqi",
      "Raiden",
      "Razor",
      "Rosaria",
      "Sara",
      "Sayu",
      "Shenhe",
      "Shinobu",
      "Sucrose",
      "Tartaglia",
      "Thoma",
      "Tighnari",
      "Traveler_Anemo",
      "Traveler_Dendro",
      "Traveler_Electro",
      "Traveler_Geo",
      "Venti",
      "Wanderer",
      "Wriothesley",
      "Xiangling",
      "XianglingDPS",
      "Xiao",
      "XiaoDPS",
      "Xingqiu",
      "Xinyan",
      "Yae",
      "Yanfei",
      "YaoYao",
      "Yelan",
      "Yoimiya",
      "YunJin",
      "Zhongli",
      "Arlecchino",
      "Emilie",
      "Xilonen",
      "Citlali",
      "Kachina",
      "Kinich",
      "LanYan",
      "Mavuika",
      "Mualani",
      "Sethos",
      "Sigewinne",
    ];

    const name = [
      "Albedo",
      "ALHaitam",
      "Aloy",
      "Amber",
      "AmberDPS",
      "Ayaka",
      "Ayato",
      "AyatoDPS",
      "Barbara",
      "Baizhu",
      "Beidou",
      "Bennett",
      "Candace",
      "Charlotte",
      "Chevreuse",
      "Chongyun",
      "Collei",
      "Chiori",
      "Cyno",
      "Dehya",
      "Diluc",
      "Diona",
      "Dori",
      "Eula",
      "Faruzan",
      "Fischl",
      "Freminet",
      "Furina",
      "Ganyu",
      "GanyuFreeze",
      "GanyuMelt",
      "Gorou",
      "Heizou",
      "HuTao",
      "Itto",
      "Jean",
      "Kazuha",
      "Kaeya",
      "KaeyaDPS",
      "Kaveh",
      "KeqingElectro",
      "KeqingPhysical",
      "Kirara",
      "Klee",
      "Kokomi",
      "Layla",
      "Lisa",
      "Lynette",
      "Lyney",
      "Mika",
      "Mona",
      "MonaFreeze",
      "MonaNuke",
      "Nahida",
      "Navia",
      "Neuvillette",
      "Ningguang",
      "NingguangDPS",
      "Nilou",
      "Noelle",
      "Qiqi",
      "Raiden",
      "Razor",
      "Rosaria",
      "Sara",
      "Sayu",
      "Shenhe",
      "Shinobu",
      "Sucrose",
      "Tartaglia",
      "Thoma",
      "Tighnari",
      "TravelerAnemo",
      "TravelerDendro",
      "TravelerElectro",
      "TravelerGeo",
      "Venti",
      "Wanderer",
      "Wriothesley",
      "Xiangling",
      "XianglingDPS",
      "Xiao",
      "XiaoDPS",
      "Xingqui",
      "Xinyan",
      "Xianyun",
      "Yae",
      "Yanfei",
      "YaoYao",
      "Yelan",
      "Yoimiya",
      "YunJin",
      "Zhongli",
      "Arlecchino",
      "Emilie",
      "Xilonen",
      "Citlali",
      "Kachina",
      "Kinich",
      "LanYan",
      "Mavuika",
      "Mualani",
      "Sethos",
      "Sigewinne",
    ];

    const correctedWord = await findClosestDistance(parameter, dictionary);
    const index = dictionary.indexOf(correctedWord);
    
    if (index !== -1) {
      const korekname = name[index];
      console.log("Build Genshin Impact " + correctedWord);

      const res = `https://DeaGaWaras.github.io/GenshinBuild/Character_${correctedWord}.jpg`;
     const buffer = Buffer.from(res)
      await conn.sendMessage(
        m.chat,
        {
          image: { url: res },
          caption: "Build Genshin Impact " + correctedWord,
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
handler.command = handler.help = ["gibuild", "buildgi"];
handler.tags = ["info"];
handler.limit = true;
module.exports = handler;
