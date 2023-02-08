const otpGenerator = require("otp-generator");


const CreateEventId = () => {
    let id = otpGenerator.generate(12, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    return id;
  };
  



module.exports = { CreateEventId }