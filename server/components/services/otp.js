const bcrypt = require("bcryptjs");

const saltRound = 10;

const createOTP = () => {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
};

const encryptOtp = async (otp) => {
  const salt = await bcrypt.genSalt(saltRound);
  const otpHash = await bcrypt.hash(otp, salt);
  return otpHash;
};

const compareOtp = async (otp, encryptOtp) => {
  const compare = await bcrypt.compare(otp, encryptOtp);
  return compare;
};

module.exports = { createOTP, encryptOtp, compareOtp };
