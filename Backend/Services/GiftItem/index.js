const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const giftItem = await prisma.giftitem.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return giftItem;
};

const GetAll = async () => {
  const giftItems = await prisma.giftitem.findMany({});
  await prisma.$disconnect();
  return giftItems;
};

const Create = async (data, image) => {
  let id = uuidv4();
  await prisma.giftitem.create({
    data: {
      id: id,
      title: data.title,
      category: data.category,
      details: data.details,
      amount: parseInt(data.amount),
      image: image,
    },
  });

  await prisma.$disconnect();
  return data;
};

const Update = async (id, data, image) => {
  const giftItem = await prisma.giftitem.findUnique({
    where: {
      id: id,
    },
  });

  if (giftItem) {
    await prisma.giftitem.update({
      where: {
        id: id,
      },
      data: {
        image: image ? image : giftItem.image,
        amount: data.amount ? parseInt(data.amount) : giftItem.amount,
        details: data.details ? data.details : giftItem.details,
        category: data.category ? data.category : giftItem.category,
        title: data.title ? data.title : giftItem.title,
      },
    });

    await prisma.$disconnect();
    return data;
  }
  return null;
};

const Delete = async (id) => {
  let giftItem = await prisma.giftitem.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return giftItem;
};

module.exports = { Create, Get, GetAll, Update, Delete };
