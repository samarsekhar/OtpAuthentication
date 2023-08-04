const User = require("../models/userModel");
const { sendMsg } = require("../services/fast2sms");
const createToken = require("../services/jwtToken");
const { createOTP, compareOtp, encryptOtp } = require("../services/otp");

const generateOtp = async (req, res) => {
  try {
    //getting phone number from request body
    const { phoneNumber } = req.body;
    //check weather phone number exist ot not
    if (!phoneNumber) {
      res.status(400).json({
        status: "Failed",
        message: "Phone number required",
      });
    }
    // check weather the user already exist
    let user = await User.findOne({ phoneNumber });
    // if user don't exist create new user
    if (!user) {
      user = await User.create({
        phoneNumber: phoneNumber,
      });
    }
    // Generate 6 digit otp by calling createOtp method
    const otp = createOTP();
    // encrypt the otp
    let hashOtp = await encryptOtp(otp);
    // store the hashed otp and otp exipry time
    user.otpToken = hashOtp;
    user.otpTokenExpiry = Date.now() + 5 * 60 * 1000;
    // save user
    await user.save();
    // send otp through fast2sms api
    const response = await sendMsg(phoneNumber, otp);
    res.status(200).json({
      id: user._id,
      response: response.message[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Faliure",
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    // getting phone number and otp from request body
    const { phoneNumber, otp } = req.body;
    // check weather both mobile number and otp exist
    if (!phoneNumber || !otp) {
      res.status(400).json({
        status: "Failed",
        message: "mobile number or otp missing",
      });
    }
    // check weather the user already exist
    const user = await User.findOne({
      phoneNumber,
      otpTokenExpiry: { $gt: Date.now() },
    });

    // if user don't exist
    if (!user) {
      res.status(400).json({
        status: "Failed",
        message: "OTP Token Expired or Invalid",
      });
    }
    // compare otp weather its valid or not
    const isValid = await compareOtp(otp, user.otpToken);

    if (!isValid) {
      res.status(400).json({
        status: "Failed",
        message: "Invalid Otp",
      });
    }
    // remove the otp token and expiry from user
    user.otpToken = undefined;
    user.otpTokenExpiry = undefined;
    await user.save();
    //create jwt token
    const token = createToken(user._id);

    res.status(200).json({
      status: "Success",
      message: "User verified successfully",
      token: token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Faliure",
      message: error.message,
    });
  }
};

module.exports = { generateOtp, verifyOtp };
