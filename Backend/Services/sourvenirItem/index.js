const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const sourvenirItem = await prisma.sourvenirItem.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return sourvenirItem;
};

const GetAll = async () => {
  const sourvenirItems = await prisma.sourvenirItem.findMany({});
  await prisma.$disconnect();
  return sourvenirItems;
};

const Create = async (data, image) => {
  let Data = await prisma.sourvenirItem.create({
    data: {
      title: data.title,
      category: data.category,
      details: data.details,
      amount: parseInt(data.amount),
      image: image,
    },
  });

  await prisma.$disconnect();
  return Data;
};

const Update = async (id, data, image) => {
  const sourvenirItem = await prisma.sourvenirItem.findUnique({
    where: {
      id: id,
    },
  });

  if (sourvenirItem) {
    let Data = await prisma.sourvenirItem.update({
      where: {
        id: id,
      },
      data: {
        image: image ? image : sourvenirItem.image,
        amount: data.amount ? parseInt(data.amount) : sourvenirItem.amount,
        details: data.details ? data.details : sourvenirItem.details,
        category: data.category ? data.category : sourvenirItem.category,
        title: data.title ? data.title : sourvenirItem.title,
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
};

const Delete = async (id) => {
  let sourvenirItem = await prisma.sourvenirItem.delete({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  return sourvenirItem;
};

module.exports = { Create, Get, GetAll, Update, Delete };
