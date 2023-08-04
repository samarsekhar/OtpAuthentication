const axios = require("axios");

const sendMsg = async (phoneNumber, otp) => {
  const data = {
    numbers: phoneNumber,
    sender_id: "FSTSMS",
    route: "otp",
    variables_values: otp,
  };

  const config = {
    headers: {
      authorization: process.env.FAST_API_KEY,
    },
  };

  try {
    const response = await axios.post(
      `https://www.fast2sms.com/dev/bulkV2`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMsg };
