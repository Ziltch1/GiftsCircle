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

const GetEventSourvenir = async (id) => {
  const sourvenirs = await prisma.sourvenir.findMany({
    where: {
      eventId: id,
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
          sourvenirItemId: data.sourvenirItemId,
        },
      },
      userId: data.userId,
      eventId: data.eventId,
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

const Buy = async (data) => {
  const sourvenir = await prisma.sourvenir.findUnique({
    where: {
      id: data.Id,
    },
  });

  if (sourvenir) {
    let Data = await prisma.sourvenir.create({
      data: {
        purchased: true,
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
  Delete,
  CreateMany,
  Buy,
};
