import { PrismaClient } from "@prisma/client";
import {
  GoogleLoginDTO,
  LoginDTO,
  VerifyEmailDTO,
} from "../../DTO/Request/Auth";
import ResponseDTO from "../../DTO/Request/Response";
import User from "../../Models/User";
import SendMail from "../../Utils/EmailService";
import {
  comparePassword,
  GenerateOtp,
  GenerateToken,
  VerifyToken,
} from "./services";
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
      await prisma.$disconnect();
      let token: string = GenerateToken(data.email);
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

const SendVerifyEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    try {
      let otp = GenerateOtp();
      var expires = new Date();
      expires.setMinutes(expires.getMinutes() + 1);
      expires = new Date(expires);

      await prisma.otp.create({
        data: {
          id: uuidv4(),
          user: user.email,
          code: otp,
          expires: expires,
        },
      });

      let result = await SendMail(email, user.firstname, otp);
      return result.response;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

const VerifyOtp = async (data: VerifyEmailDTO) => {
  const otp = await prisma.otp.findFirst({
    where: {
      code: data.code,
    },
  });

  if (otp && data.user === otp.user) {
    try {
      var currentDate = new Date().getTime();
      var expires = new Date(otp.expires).getTime();
      if (expires > currentDate) {
        await prisma.user.update({
          where: {
            email: otp.user,
          },
          data: {
            emailVerified: true,
          },
        });
        await prisma.otp.delete({
          where: {
            id: otp.id,
          },
        });
        return new ResponseDTO("Success", "Email has been verified");
      } else {
        await prisma.otp.delete({
          where: {
            id: otp.id,
          },
        });
        return new ResponseDTO("Failed", "Otp has Expired");
      }
    } catch (error) {
      return new ResponseDTO("Failed", "Request Failed");
    }
  }
  return new ResponseDTO("Failed", "Otp is Invalid");
};

export { Login, GoogleSignIn, VerifyOtp, SendVerifyEmail };
