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
  let Data = await prisma.giftitem.create({
    data: {
      title: data.title,
      category: data.category,
      details: data.details,
      amount: parseInt(data.amount),
      image: image,
      weight: parseInt(data.weight),
    },
  });

  await prisma.$disconnect();      
  return Data;
};

const Update = async (id, data, image) => {
  const giftItem = await prisma.giftitem.findUnique({
    where: {
      id: id,
    },
  });

  if (giftItem) {
   let Data = await prisma.giftitem.update({
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
    return Data;
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
