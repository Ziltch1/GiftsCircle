const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const asoebiItem = await prisma.asoebiitem.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return asoebiItem;
};

const GetAll = async () => {
  const asoebiItems = await prisma.asoebiitem.findMany({});
  await prisma.$disconnect();
  return asoebiItems;
};

const Create = async (data, image) => {
  let id = uuidv4();
  let Data = await prisma.asoebiitem.create({
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

const Update = async (id, data, image) => {
  const asoebiItem = await prisma.asoebiitem.findUnique({
    where: {
      id: id,
    },
  });

  if (asoebiItem) {
    let Data = await prisma.asoebiitem.update({
      where: {
        id: id,
      },
      data: {
        image: image ? image : asoebiItem.image,
        amount: data.amount ? parseInt(data.amount) : asoebiItem.amount,
        details: data.details ? data.details : asoebiItem.details,
        category: data.category ? data.category : asoebiItem.category,
        title: data.title ? data.title : asoebiItem.title,
        updated_at: new Date(Date.now()),
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
};

const Delete = async (id) => {
  let asoebiItem = await prisma.asoebiitem.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return asoebiItem;
};

module.exports = { Create, Get, GetAll, Update, Delete };
