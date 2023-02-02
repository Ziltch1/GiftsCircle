const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

// compare password
const comparePassword = async (password: string, hashedPassword: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

const GenerateToken = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_KEY, {
    algorithm: "HS256",
    expiresIn: 4 * 60 * 60,
  });
  return token;
};

const VerifyToken = (token: string) => {
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

export { comparePassword, GenerateToken, VerifyToken, GenerateOtp };
