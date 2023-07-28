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

const Create = async (data) => {
  let id = uuidv4();
  let Data = await prisma.asoebi.create({
    data: {
      id: id,
      quantity: 0,
      amountPaid: 0,
      asoebiItem: data.asoebiItem,
      userId: data.userId,
      eventId: data.eventId,
      increment: data.increment,
      purchasedByHost: data.purchasedByHost,
    },
  });

  await prisma.$disconnect();
  return Data;
};

const CreateMany = async (data) => {
  data.forEach((element) => {
    element.id = uuidv4();
    element.amountPaid = 0;
    element.quantity = 0;
    return element;
  });
  await prisma.asoebi.createMany({
    data: [...data],
    skipDuplicates: true,
  });

  const message = `Asoebis has been added for guest`;
  const notification = await prisma.notifications.create({
    data: {
      userId: data.userId,
      type: "ASOEBI_ADDITION",
      message: message,
      referenceEvent: data.eventId,
    },
  });
  await prisma.$disconnect();
  return { data, notification };
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
        asoebiId: data.asoebiId,
        userId: data.userId,
        eventId: data.eventId,
        quantity: data.quantity,
        delivered: false,
        asoebiitemId: asoebi.asoebiItem,
      },
    });

    await prisma.asoebi.update({
      where: {
        id: asoebi.id,
      },
      data: {
        amountPaid: asoebi.amountPaid + data.amount,
        quantity: asoebi.quantity + data.quantity,
        updated_at: new Date(Date.now()),
        updated_by: data.userId,
      },
    });

    const user = await prisma.user.findFirst({ where: { id: data.userId } });
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    });
    const message = `${user.firstname} bought ${data.quantity} quantity of asoebi`;
    const guestMessage = `You have bought ${data.quantity} quantity of asoebi`;
    const notification = await prisma.notifications.create({
      data: {
        userId: event.user_id,
        type: "ASOEBI",
        message: message,
        referenceEvent: event.id,
      },
    });

    const guestNotification = await prisma.notifications.create({
      data: {
        userId: data.userId,
        type: "PURCHASE",
        message: guestMessage,
      },
    });
    await prisma.$disconnect();

    return { buy, notification, guestNotification };
  }
  return null;
};

const GetAsoebiBuyers = async (id) => {
  let buyers = await prisma.asoebiTransaction.findMany({
    where: {
      eventId: id,
    },
    select: {
      amount: true,
      quantity: true,
      purchasedBy: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
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
  Buy,
  GetEventAsoebi,
  Buy,
  GetAsoebiBuyers,
};
