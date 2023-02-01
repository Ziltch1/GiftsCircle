import { PrismaClient } from "@prisma/client";
import { Verify } from "crypto";
import ChangePasswordDTO from "../../DTO/Request/User/ChangePasswordDTO";
import CreateUserDTO from "../../DTO/Request/User/CreateDTO";
import SetPasswordDTO from "../../DTO/Request/User/SetPassword";
import User from "../../Models/User";
import { comparePassword, VerifyToken } from "../Auth/services";
import { hashPassword } from "./service";
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Create = async (data: CreateUserDTO) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  const id = uuidv4();
  if (!user) {
    await prisma.user.create({
      data: {
        password: uuidv4(),
        email: data.email,
        lastname: data.lastname,
        firstname: data.firstname,
        id: id,
      },
    });
    await prisma.$disconnect();

    return data;
  }
  return null;
};

const SetPassword = async (data: SetPasswordDTO, type: string) => {
  let token_data = null;
  if (type === "RESET") {
    token_data = VerifyToken(data.user);
  }
  const user = await prisma.user.findUnique({
    where: {
      email: token_data ? token_data.email : data.user,
    },
  });

  if (user) {
    let hashedPassword = await hashPassword(data.password);

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.$disconnect();
    return user;
  }
  return null;
};

const ChangePassword = async (data: ChangePasswordDTO) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    let checkPassword = await comparePassword(data.password, user.password);

    if (checkPassword) {
      let hashedPassword = await hashPassword(data.password);
      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    await prisma.$disconnect();
    return user;
  }
  return null;
};

const GetUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return user;
};

export { Create, GetUser, SetPassword, ChangePassword };
