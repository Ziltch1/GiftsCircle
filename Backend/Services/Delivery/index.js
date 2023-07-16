const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();
var moment = require("moment");

const Get = async (userId) => {
  const delivery = await prisma.delivery.findMany({
    where: {
      userId: userId,
    },
  });

  await prisma.$disconnect();
  return delivery;
};

const GetEventDeliveryDetails = async (eventId) => {
  const delivery = await prisma.delivery.findFirst({
    where: {
      eventId: eventId,
    },
  });

  await prisma.$disconnect();
  return delivery;
};

const GetDeliveryTrans = async (id) => {
  const deliveryTrans = await prisma.deliveryTransactions.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return deliveryTrans;
};

const GetUserDeliveryTrans = async (userId) => {
  const deliveryTrans = await prisma.deliveryTransactions.findMany({
    where: {
      userId: userId,
    },
  });

  await prisma.$disconnect();
  return deliveryTrans;
};

const Create = async (data) => {
  const delivery = await prisma.delivery.findFirst({
    where: {
      eventId: data.eventId,
    },
  });

  if (delivery) {
    await prisma.$disconnect();
    return delivery;
  }
  let id = uuidv4();
  const Data = await prisma.delivery.create({
    data: {
      id: id,
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      info: data.info,
      lga: data.lga,
      state: data.state,
      tel: data.tel,
      tel2: data.tel2 ? data.tel2 : "",
      userId: data.userId,
      eventId: data.eventId,
    },
  });

  await prisma.$disconnect();
  return Data;
};

const Update = async (id, data) => {
  const delivery = await prisma.delivery.findUnique({
    where: {
      id: id,
    },
  });

  if (delivery) {
    let Data = await prisma.delivery.update({
      where: {
        id: id,
      },
      data: {
        firstname: data.firstname ? data.firstname : delivery.firstname,
        lastname: data.lastname ? data.lastname : delivery.lastname,
        address: data.address ? data.address : delivery.address,
        info: data.info ? data.info : delivery.info,
        lga: data.lga ? data.lga : delivery.lga,
        state: data.state ? data.state : delivery.state,
        tel: data.tel ? data.tel : delivery.tel,
        tel2: data.tel2 ? data.tel2 : delivery.tel2,
        updated_at: new Date(Date.now()),
        updated_by: delivery.userId,
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
};

const CreateDeliveryTrans = async (data) => {
  let id = uuidv4();
  const Data = await prisma.deliveryTransactions.create({
    data: {
      id: id,
      item: data.item,
      deliveryFee: data.deliveryFee,
      status: "PENDING",
      user: {
        connect: {
          id: data.userId,
        },
      },
      expectedDate: moment(new Date(Date.now())).add(14, "days").toDate(),
      created_by: data.userId,
    },
  });

  const message = `Delivery: Your delivery for item ${data.item} has been created`;
  const notification = await prisma.notifications.create({
    data: {
      userId: data.userId,
      type: "DELIVERY",
      message: message,
    },
  });

  await prisma.$disconnect();
  return { Data, notification };
};

const Delete = async (id) => {
  let delivery = await prisma.delivery.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return delivery;
};

module.exports = {
  Create,
  Get,
  GetEventDeliveryDetails,
  GetDeliveryTrans,
  GetUserDeliveryTrans,
  CreateDeliveryTrans,
  Delete,
  Update,
};
