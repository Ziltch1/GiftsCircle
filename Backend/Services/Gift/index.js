const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const gift = await prisma.gift.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return gift;
};

const GetAll = async () => {
  const gifts = await prisma.gift.findMany();

  await prisma.$disconnect();
  return gifts;
};

const GetEventGifts = async (id) => {
  const gifts = await prisma.gift.findMany({
    where: {
      eventId: id,
    },
  });
  await prisma.$disconnect();
  return gifts;
};

const GetUserPurchasedGifts = async (id) => {
  const gifts = await prisma.gift.findMany({
    where: {
      purchasedBy: id,
    },
  });
  await prisma.$disconnect();
  return gifts;
};

const Create = async (data) => {
  let id = uuidv4();
  await prisma.gift.create({
    data: {
      id: id,
      enableContribution: data.enableContribution,
      purchased: false,
      eventId: data.eventId,
      purchasedBy: "",
      quantity: data.quantity ? data.quantity : 1,
      status: "UnPaid",
      amountPaid: 0,
      giftItemId: data.giftItemId,
      complimentaryGift: data.complimentaryGift,
    },
  });

  await prisma.$disconnect();
  return data;
};

const CreateMany = async (data) => {
  data.gifts.forEach((element) => {
    element.id = uuidv4();
    (element.enableContribution = data.enableContribution),
      (element.purchased = false),
      (element.status = "UnPaid"),
      (element.amountPaid = 0);
    element.purchasedBy = "";
    return element;
  });
  await prisma.gift.createMany({
    data: [...data],
    skipDuplicates: true,
  });

  await prisma.$disconnect();
  return data;
};

const EnableContribution = async (data, id) => {
  let gift = null;
  if (id) {
    gift = await prisma.gift.findUnique({
      where: {
        id: id,
      },
    });
  } else {
    gift = await prisma.gift.findFirst({
      where: {
        giftItemId: data.giftItemId,
        eventId: data.eventId,
      },
    });
  }

  if (gift) {
    const data = await prisma.gift.update({
      where: {
        id: gift.id,
      },
      data: {
        enableContribution: true,
      },
    });

    await prisma.$disconnect();
    return data;
  }
  return null;
};

const Delete = async (id) => {
  let gift = await prisma.gift.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return gift;
};

module.exports = {
  Create,
  Get,
  GetAll,
  GetEventGifts,
  Delete,
  CreateMany,
  EnableContribution,
  GetUserPurchasedGifts,
};
