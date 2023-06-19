const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const complimentaryItem = await prisma.complimentarygift.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return complimentaryItem;
};

const GetAll = async () => {
  const complimentaryItems = await prisma.complimentarygift.findMany({});
  await prisma.$disconnect();
  return complimentaryItems;
};

const Create = async (data, image) => {
  let id = uuidv4();
  let Data = await prisma.complimentarygift.create({
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
  return Data;
};

const Buy = async (data) => {
  data.forEach((element) => {
    element.id = uuidv4();
    element.date = new Date(Date.now());
    element.quantity = 1;
    return element;
  });
  let transactions = await prisma.giftTransaction.createMany({
    data: [...data],
    skipDuplicates: true,
  });
  await prisma.$disconnect();

  return transactions;
};

const Update = async (id, data, image) => {
  const complimentaryItem = await prisma.complimentarygift.findUnique({
    where: {
      id: id,
    },
  });

  if (complimentaryItem) {
    let Data = await prisma.complimentarygift.update({
      where: {
        id: id,
      },
      data: {
        image: image ? image : complimentaryItem.image,
        amount: data.amount ? parseInt(data.amount) : complimentaryItem.amount,
        details: data.details ? data.details : complimentaryItem.details,
        category: data.category ? data.category : complimentaryItem.category,
        title: data.title ? data.title : complimentaryItem.title,
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
};

const Delete = async (id) => {
  let complimentarygift = await prisma.giftTransaction.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return complimentarygift;
};

module.exports = { Create, Buy, Get, GetAll, Update, Delete };
