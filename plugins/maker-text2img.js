const uploadImage = require("../lib/uploadImage");
const axios = require("axios");
let handler = async (m, { conn, usedPrefix, command }) => {
    const payloads = {
      server_name: "jisoo",
      prompt: command, // your imagination go here
      width: 512, // 512-1024
      height: 512, // 512-1024
      steps: 25, // max 50 steps
      model_id: "dream-shaper-8797", // default dream_shaper
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
      lora_model: "frieren", // use loaded lora_model
      hiresFix: "no", // otherwise pass "no"
      lora_strength: 0.5, // default 1
      clip_skip: 2,
      webhook: true, // will send post about generating progress
    };

    try {
      // Async/await request ke API
      const { data } = await axios.request({
        baseURL: "https://api.itsrose.rest",
        url: "/image/diffusion/txt2img",
        method: "POST",
        headers: {
          Authorization: "Rk-SarulBelatungPadang123",
        },
        data: payloads,
      });

      const { status, message } = data; // status kode apa pun

      if (!status) {
        // Ada masalah dengan payloads
        m.reply(message);
        return console.error(message);
      }

      const { result } = data;
      const { generation_time, images, metadata } = result;
      console.log("Text Ke Image: ", images);
      const second = `Starting Generation Time: ${generation_time.toFixed(
        2
      )} second`;
      let formattedMetadata = "";
      for (const key in metadata) {
        formattedMetadata += `*${key}*: ${metadata[key]}\n`;
      }
      let { key } = await sock.sendMessage(
        m.chat,
        { text: second },
        { quoted: m }
      );
      await delay(1000);
      setTimeout(() => {
        conn.sendMessage(
          m.chat,
          { text: `${formattedMetadata}`, edit: key },
          { quoted: m }
        );
        for (const url of images) {
          conn.sendMessage(
            m.chat,
            {
              image: { url },
              caption: "Done",
            },
            { quoted: m }
          );
        }
      }, generation_time * 1000);
    } catch (error) {
      console.error("Error:", error);
      m.reply("Terjadi kesalahan dalam memproses permintaan.");
    }
};
handler.help = ["txt2img"];
handler.command = ["text2img", "txt2img"];
handler.tags = ["maker"];
handler.premium = false;
handler.limit = true;
module.exports = handler;
