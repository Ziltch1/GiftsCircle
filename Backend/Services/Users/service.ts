import { PrismaClient } from "@prisma/client";
import { GenerateOtp } from "../Auth/services";

const prisma = new PrismaClient()

const bcrypt = require("bcrypt");

const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};



export { hashPassword };
