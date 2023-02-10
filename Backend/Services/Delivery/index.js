const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const delivery = await prisma.delivery.findFirst({
    where: {
      userId: id,
    },
  });

  await prisma.$disconnect();
  return delivery;
};

const Create = async (data) => {
  let id = uuidv4();
  const delivery = await prisma.delivery.findFirst({
    where: {
      userId: data.userId,
    },
  });
  if (!delivery) {
    const Data = await prisma.delivery.create({
      data: {
        id: id,
        address: data.address,
        city: data.city,
        state: data.state,
        orderDate: new Date(data.orderDate),
        country: data.country,
        expectedDate: new Date(data.expectedDate),
        tel: data.tel,
        tel2: data.tel2,
        userId: data.userId,
        postalCode: data.postalCode,
        status: "Pending"
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
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
        address: data.address ? data.address : delivery.address,
        city: data.city ? data.city : delivery.city,
        state: data.state ? data.state : delivery.state,
        orderDate: data.orderDate ? new Date(data.orderDate) : delivery.orderDate,
        country: data.country ? data.country : delivery.country,
        expectedDate: data.expectedDate ? new Date(data.expectedDate) : delivery.expectedDate,
        tel: data.tel ? data.tel : delivery.tel,
        tel2: data.tel2 ? data.tel2 : delivery.tel2,
        postalCode: data.postalCode,
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
};

const UpdateStatus = async (id, data) => {
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
        status: data.status
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
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
  Delete,
  Update,
  UpdateStatus
};
