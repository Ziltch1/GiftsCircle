const otpGenerator = require("otp-generator");

const Id_Generator = (number, upper, lower, special, digits) => {
  let id = otpGenerator.generate(number, {
    upperCaseAlphabets: upper,
    specialChars: lower,
    lowerCaseAlphabets: special,
    digits: digits,
  });
  return id;
};

const CreateEventId = () => {
  return Id_Generator(12, false, false, false, true)
};

const CreateCoHostId = () => {
  return Id_Generator(6, true, true, false, true)
};

const CreateGuestId = () => {
  return Id_Generator(6, true, true, false, true)
};


module.exports = { CreateEventId, CreateCoHostId, CreateGuestId };
