const axios = require("axios");
const uploadImage = require("../lib/uploadImage");

const AUTH_TOKEN = "Bearer Prod-Sk-d39d5bad8869e9b5e39e275330c08345";
const API_URL = "https://api.itsrose.rest/differentMe";

async function fetchStyles() {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/styles`,
      headers: { Authorization: AUTH_TOKEN },
    });

    const styles = response.data?.result?.styles || [];
    return styles.sort(); // Return sorted styles
  } catch (error) {
    console.error("Error fetching styles:", error.message);
    throw error;
  }
}

async function createImage(initImage, styleId) {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/create`,
      headers: {
        Authorization: AUTH_TOKEN,
        "Content-Type": "application/json",
      },
      data: { init_image: initImage, style_id: styleId },
    });

    return response.data?.result;
  } catch (error) {
    console.error("Error creating image:", error.message);
    throw error;
  }
}

async function fetchTaskStatus(taskId) {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}/status?task_id=${taskId}`,
      headers: { Authorization: AUTH_TOKEN },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching task status:", error.message);
    throw error;
  }
}

let handler = async (m, { conn, usedPrefix, command, args }) => {
  var q = m.quoted ? m.quoted : m;
  var mime = (q.msg || q).mimetype || q.mediaType || "";

  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    await conn.reply(m.chat, "⏳ Processing your image...", m);

    try {
      const img = await q.download?.();
      const uploadedImg = await uploadImage(img);
      const initImage = uploadedImg;

      // Fetch styles
      const styles = await fetchStyles();
      const styleId = args[0];

      if (!styles.includes(styleId)) {
        const availableStyles = styles.map((s, i) => `${i + 1}. ${s}`).join("\n");
        return await conn.reply(
          m.chat,
          `❌ Invalid style!\n\nAvailable styles:\n${availableStyles}`,
          m
        );
      }

      // Create image
      const task = await createImage(initImage, styleId);

      if (task?.task_id) {
        await conn.reply(m.chat, "🖼️ Image creation started. Checking status...", m);

        // Poll task status
        let taskStatus;
        do {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          taskStatus = await fetchTaskStatus(task.task_id);
        } while (taskStatus?.result?.status === "processing");

        if (taskStatus?.result?.status === "completed") {
          const images = taskStatus.result.images || [];
          if (images.length) {
            await conn.sendMessage(
              m.chat,
              { image: { url: images[0] }, caption: "✅ Here is your generated image!" },
              { quoted: m }
            );
          } else {
            await conn.reply(m.chat, "❌ No images generated.", m);
          }
        } else {
          await conn.reply(m.chat, `❌ Task failed: ${taskStatus?.result?.error_msg || "Unknown error"}`, m);
        }
      }
    } catch (e) {
      console.error(e);
      m.reply("❌ Failed to process your request.");
    }
  } else {
    m.reply(
      `Send an image with the caption *${usedPrefix + command} <style_id>* or tag an image message.`
    );
  }
};

handler.help = ["differentme"];
handler.command = ["differentme", "dm"];
handler.tags = ["maker"];
handler.premium = false;
handler.limit = true;

module.exports = handler;
