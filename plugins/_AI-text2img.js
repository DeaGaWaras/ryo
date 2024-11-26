const fetch = require("node-fetch");
const axios = require("axios");

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `🚩 *Masukan detail gambar!* `;

  const msg = await conn.sendMessage(
    m.chat,
    { text: "_Preparing Txt2Img_" },
    { quoted: m }
  );

  const payloads = {
    server_name: "jisoo",
    prompt: text, // your imagination go here
    width: 512, // 512-1024
    height: 512, // 512-1024
    steps: 25, // max 50 steps
    model_id: "yesmix", // default dream_shaper
    sampler: "Euler a", // default DPMS
    seed: null, // pass null or remove to get random seed
    cfg: 5, // max 15<
    image_num: 1, // max 4
    negative_prompt:
      "(worst quality, low quality:1.4), BadPrompt, UnrealisticDream", // something you dont want appear in image
    safety_checker_type: "blur",
    safety_checker: "no", // set "yes" to replace nsfw image
    is_nsfw: false,
    embeddings: "negative_hand-neg, verybadimagenegative_v1.3",
    algorithm_type: "sde-dpmsolver++",
    /* Another optional parameter */
    enhance_prompt: "no", // if "yes" will add another prompt
    multi_lingual: "no", // pass "yes" if you want use other than english language
    panorama: "no", // pass "yes" if want panorama image
    lora_model: "more_details", // use loaded lora_model
    hiresFix: "no", // otherwise pass "no"
    lora_strength: 0.5, // default 1
    clip_skip: 2,
    webhook: true, // will send post about generating progress
  };

  try {
    const { data } = await axios.request({
      baseURL: "https://api.itsrose.rest",
      url: "/sdapi/txt2img",
      method: "POST",
      headers: {
        Authorization: rose,
      },
      data: payloads,
    });

    const { status, message } = data; // status kode apa pun

    if (!status) {
      await conn.sendMessage(m.chat, {
        text: message,
        edit: { ...msg.key },
      });
      return;
    }

    const { result } = data;
    const { generation_time, images, metadata } = result;
    console.log("Text Ke Image: ", images);
    await conn.sendMessage(m.chat, {
      text: `Image generated in ${result["generation_time"].toFixed(
        2
      )} seconds`,
      edit: { ...msg.key },
    });

    // wait the image to be ready
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, result["generation_time"] * 1000);
    });

    await conn.sendMessage(m.chat, {
      text: (function (t = "") {
        for (const key in result["metadata"]) {
          t += `*${key}*: ${result["metadata"][key]}\n`;
        }
        return t.trim();
      })(`*server_name*: ${result["server_name"]}\n`),
      edit: { ...msg.key },
    });

    try {
      for await (const url of result["images"]) {
        await conn.sendMessage(
          m.chat,
          {
            image: { url },
          },
          { quoted: m }
        );
      }
    } catch {
      await conn.sendMessage(m.chat, {
        text: "Failed getting images from: " + result["images"].join(", "),
        edit: { ...msg.key },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    m.reply("Terjadi kesalahan dalam memproses permintaan.");
  }
};

handler.help = ["txt2img"];
handler.command = ["text2img", "txt2img"];
handler.tags = ["tools"];
handler.limit = false;
handler.premium = true;

module.exports = handler;
