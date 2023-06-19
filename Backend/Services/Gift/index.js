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
  const gifts = await prisma.giftTransaction.findMany({
    where: {
      userId: id,
    },
    include: {
      gift: {
        select: {
          giftItemId: true,
          status: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return gifts;
};

const GetUserEventPurchasedGifts = async (id, eventId) => {
  const gifts = await prisma.giftTransaction.findMany({
    where: {
      userId: id,
      eventId: eventId,
    },
    include: {
      gift: {
        select: {
          giftItemId: true,
          status: true,
          complimentaryGift: true,
        },
      },
      complimentaryGift: {
        select: {
          id: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return gifts;
};

const GetEventGiftTransactions = async (id) => {
  const transactions = await prisma.giftTransaction.findMany({
    where: {
      eventId: id,
    },
    include: {
      purchasedBy: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
      gift: {
        select: {
          giftItemId: true,
          status: true,
          complimentaryGift: true,
        },
      },
      complimentaryGift: {
        select: {
          id: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return transactions;
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
  data.forEach((element) => {
    element.id = uuidv4();
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

const Buy = async (data) => {
  data.forEach(async (ele) => {
    let check = ele.amountPaid + ele.amount > ele.giftItemAmount;

    await prisma.gift.update({
      where: {
        id: ele.giftId,
      },
      data: {
        purchased: check,
        status: ele.status,
        complimentaryGift: ele.complimentaryGift,
        amountPaid: ele.amountPaid + ele.amount,
      },
    });
  });

  data.forEach((element) => {
    delete element.status;
    delete element.complimentaryGift;
    delete element.amountPaid;
    delete element.giftItemAmount;

    element.id = uuidv4();
    element.date = new Date(Date.now());
    element.quantity = 1;
    return element;
  });
  let transactions = await prisma.giftTransaction.createMany({
    data: [...data],
    skipDuplicates: true,
  });

  const user = await prisma.user.findFirst({ where: { id: data.userId } });
  const event = await prisma.event.findUnique({
    where: { id: data[0].eventId },
  });
  const message = `${user.firstname} bought some gifts`;
  const notification = await prisma.notifications.create({
    data: {
      userId: event.user_id,
      type: "PURCHASE",
      message: message,
    },
  });
  await prisma.$disconnect();

  return { transactions, notification };
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
  GetEventGiftTransactions,
  GetUserEventPurchasedGifts,
  Delete,
  CreateMany,
  Buy,
  EnableContribution,
  GetUserPurchasedGifts,
};
