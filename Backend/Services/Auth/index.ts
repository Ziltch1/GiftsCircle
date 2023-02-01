import { PrismaClient } from "@prisma/client";
import { GoogleLoginDTO, LoginDTO } from "../../DTO/Request/Auth/LoginDTO";
import User from "../../Models/User";
import SendMail from "../../Utils/EmailService";
import { comparePassword, GenerateOtp, GenerateToken, VerifyToken } from "./services";
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

const Login = async (data: LoginDTO) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    let checkPasssword = await comparePassword(data.password, user.password);
    if (checkPasssword) {
      let token = GenerateToken(user.email);
      await prisma.$disconnect();
      return { token, user };
    }

    return null;
  }
  return null;
};

const GoogleSignIn = async (data: GoogleLoginDTO) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    let token = GenerateToken(user.email);
    await prisma.$disconnect();
    return { token, user };
  }
  return null;
};

const VerifyEmail = async (token: string) => {
  let token_data = VerifyToken(token);

  const user = await prisma.user.findUnique({
    where: {
      email: token_data.email,
    },
  });

  if (user) {
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        emailVerified: true,
      },
    });
    await prisma.$disconnect();
    return user;
  }
  return null;
};

const SendVerifyEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    try {
      let otp = GenerateOtp()
      
      let result = await SendMail(email, user.firstname, otp);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};
export { Login, GoogleSignIn, VerifyEmail, SendVerifyEmail };
