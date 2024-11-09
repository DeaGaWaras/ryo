const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to https://api.itsrose.rest/uploader/file
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async (buffer) => {
  const { ext, mime } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  
  // Append the image buffer to the form with the appropriate filename and content type
  form.append("file", buffer, { filename: `tmp.${ext}`, contentType: mime });
  form.append("blur_face", "false");

  try {
    const { data } = await axios.post("https://api.itsrose.rest/uploader/file", form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': 'Rk-SaruulBelatungPadang',
        'accept': 'application/json',
      },
    });

    console.log(data);  
    // Return the URL of the uploaded image
    return data.result.url;
  } catch (error) {
    throw error;
  }
};
