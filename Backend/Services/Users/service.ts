const bcrypt = require("bcrypt");

const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export { hashPassword };
