const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const asoebi = await prisma.asoebi.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return asoebi;
};

const GetAll = async () => {
  const asoebi = await prisma.asoebi.findMany();

  await prisma.$disconnect();
  return asoebi;
};

const GetEventAsoebi = async (id) => {
  const asoebis = await prisma.asoebi.findMany({
    where: {
      eventId: id,
    },
  });
  await prisma.$disconnect();
  return asoebis;
};

// const GetUserPurchasedGifts = async (id) => {
//   const gifts = await prisma.gift.findMany({
//     where: {
//       purchasedBy: id,
//     },
//   });
//   await prisma.$disconnect();
//   return gifts;
// };

const Create = async (data) => {
  let id = uuidv4();
  await prisma.asoebi.create({
    data: {
      id: id,
      quantity: 0,
      amountPaid: 0,
      asoebiItem: data.asoebiItemId,
      userId: data.userId,
      eventId: data.eventId,
      increment: data.increment,
    },
  });

  await prisma.$disconnect();
  return data;
};

const CreateMany = async (data) => {
  data.forEach((element) => {
    element.id = uuidv4();
    element.amountPaid = 0;
    return element;
  });
  await prisma.asoebi.createMany({
    data: [...data],
    skipDuplicates: true,
  });

  await prisma.$disconnect();
  return data;
};

const Delete = async (id) => {
  let asoebi = await prisma.asoebi.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return asoebi;
};

const Buy = async (data) => {
  const asoebi = await prisma.asoebi.findUnique({
    where: {
      id: data.asoebiId,
    },
  });

  if (asoebi) {
    const buy = await prisma.asoebiTransaction.create({
      data: {
        id: uuidv4(),
        amount: data.amount,
        asoebiitemId: data.asoebiId,
        purchasedBy: data.purchasedBy,
        eventId: data.eventId,
        quantity: data.quantity,
        date: new Date(Date.now()),
        delivered: false,
      },
    });

    await prisma.asoebi.update({
      where: {
        id: asoebi.id,
      },
      data: {
        amountPaid: asoebi.amountPaid + data.amount,
        quantity: asoebi.quantity + data.quantity,
      },
    });
    await prisma.$disconnect();

    return buy;
  }
  return null;
};

const GetAsoebiBuyers = async (id) => {
  let buyers = await prisma.asoebiTransaction.findMany({
    where: {
      asoebiitemId: id,
    },
    select: {
      amount: true,
      quantity: true,
      purchasedBy: true,
      id: true,
      date: true,
    },
  });

  await prisma.$disconnect();
  return buyers;
};

module.exports = {
  Create,
  Get,
  GetAll,
  Delete,
  CreateMany,
  GetEventAsoebi,
  Buy,
  GetAsoebiBuyers,
};
