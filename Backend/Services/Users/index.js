const { PrismaClient } = require("@prisma/client");
const SendEmail = require("../../Utils/EmailService");
const {
  comparePassword,
  GenerateOtp,
  VerifyToken,
} = require("../Auth/services");
const { hashPassword } = require("./service");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Create = async (data) => {
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
        emailVerified: false,
        id: id,
      },
    });

    let otp = GenerateOtp();
    var expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    expires = new Date(expires);

    await prisma.otp.create({
      data: {
        id: uuidv4(),
        user: data.email,
        code: otp,
        expires: expires,
      },
    });

    await SendEmail(data.email, data.firstname, otp);
    await prisma.$disconnect();

    return data;
  }
  return null;
};

const SetPassword = async (data, type) => {
  let token_data = null;
  if (type === "RESET") {
    token_data = VerifyToken(data.auth);
  }
  const user = await prisma.user.findUnique({
    where: {
      email: token_data ? token_data.email : data.auth,
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

const ChangePassword = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    let checkPassword = await comparePassword(data.oldPassword, user.password);

    if (checkPassword) {
      let hashedPassword = await hashPassword(data.newPassword);
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

const GetUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return user;
};

module.exports = { Create, GetUser, SetPassword, ChangePassword };
