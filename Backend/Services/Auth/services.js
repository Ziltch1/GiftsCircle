const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

// compare password
const comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

const GenerateToken = (email, duration) => {
  const token = jwt.sign({ email }, process.env.JWT_KEY, {
    algorithm: "HS256",
    expiresIn: duration,
  });
  return token;
};

const VerifyToken = (token) => {
  let payload = jwt.verify(token, process.env.JWT_KEY);
  return payload;
};

const GenerateOtp = () => {
  let otp = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
  return otp;
};

module.exports = { comparePassword, GenerateToken, VerifyToken, GenerateOtp };
