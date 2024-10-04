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

*Daftar Character:*
1. Albedo
2. ALHaitam
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
17. Collei
18. Cyno
19. Dehya
20. Diluc
21. Diona
22. Dori
23. Emilie
24. Eula
25. Faruzan
26. Fischl
27. Freminet
28. Furina
29. Ganyu
30. Ganyu_Freeze
31. Ganyu_Melt
32. Gaming
33. Gorou
34. Heizou
35. HuTao
36. Itto
37. Jean
38. Kaeya
39. KaeyaDPS
40. Kaveh
41. Kazuha
42. Keqing_Electro
43. Keqing_Physical
44. Kirara
45. Klee
46. Kokomi
47. Layla
48. Lisa
49. Lynette
50. Lyney
51. Mika
52. Mona
53. Mona_Freeze
54. Mona_Nuke
55. Nahida
56. Navia
57. Neuvillette
58. Ningguang
59. NingguangDPS
60. Nilou
61. Noelle
62. Qiqi
63. Raiden
64. Razor
65. Rosaria
66. Sara
67. Sayu
68. Shenhe
69. Shinobu
70. Sucrose
71. Tartaglia
72. Thoma
73. Tighnari
74. Traveler_Anemo
75. Traveler_Dendro
76. Traveler_Electro
77. Traveler_Geo
78. Venti
79. Wanderer
80. Wriothesley
81. Xiangling
82. XianglingDPS
83. Xiao
84. XiaoDPS
85. Xilonen
86. Xingqui
87. Xinyan
88. Xianyun
89. Yae
90. Yanfei
91. YaoYao
92. Yelan
93. Yoimiya
94. YunJin
95. Zhongli`;

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
      "Xilonen"
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
      "Xilonen"
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
