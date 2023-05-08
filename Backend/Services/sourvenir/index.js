const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const sourvenir = await prisma.sourvenir.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return sourvenir;
};

const GetAll = async () => {
  const sourvenirs = await prisma.sourvenir.findMany();

  await prisma.$disconnect();
  return sourvenirs;
};

const GetUserSourvenir = async (id) => {
  const sourvenirs = await prisma.sourvenir.findMany({
    where: {
      userId: id,
    },
  });
  await prisma.$disconnect();
  return sourvenirs;
};

const Create = async (data) => {
  let id = uuidv4();
  let Data = await prisma.sourvenir.create({
    data: {
      id: id,
      quantity: data.quantity,
      sourvenirItem: {
        connect: {
          id: data.sourvenirItemId,
        },
      },
      userId: data.userId,
    },
  });

  await prisma.$disconnect();
  return Data;
};

const CreateMany = async (data) => {
  data.forEach((element) => {
    element.id = uuidv4();
    return element;
  });
  await prisma.sourvenir.createMany({
    data: [...data],
    skipDuplicates: true,
  });

  await prisma.$disconnect();
  return data;
};

const Delete = async (id) => {
  let sourvenir = await prisma.sourvenir.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return sourvenir;
};

const Buy = async (id) => {
  const sourvenir = await prisma.sourvenir.findUnique({
    where: {
      id: id,
    },
  });

  if (sourvenir) {
    let Data = await prisma.sourvenir.update({
      where: {
        id: sourvenir.id,
      },
      data: {
        purchased: true,
      },
    });

    return Data;
  }
  return null;
};

const Update = async (data) => {
  const sourvenir = await prisma.sourvenir.findUnique({
    where: {
      id: data.id,
    },
  });

  if (sourvenir) {
    let Data = await prisma.sourvenir.update({
      where: {
        id: sourvenir.id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    return Data;
  }
  return null;
};

module.exports = {
  Create,
  Get,
  GetAll,
  GetUserSourvenir,
  Delete,
  CreateMany,
  Update,
  Buy,
};
