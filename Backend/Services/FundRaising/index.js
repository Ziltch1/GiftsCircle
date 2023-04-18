const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const ResponseDTO = require("../../DTO/Response");

const GetFundRaising = async (id) => {
  const fundRaising = await prisma.fundRaising.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return fundRaising;
};

const Create = async (data) => {
  const event = await prisma.event.findUnique({
    where: {
      id: data.eventId,
    },
  });

  if (event) {
    let fundRaising = await prisma.fundRaising.create({
      data: {
        id: uuidv4(),
        eventId: data.eventId,
        amount: data.amount,
        amountPaid: 0,
        active: true,
      },
    });

    await prisma.$disconnect();
    return fundRaising;
  }
  return null;
};

const UpdateStatus = async (data) => {
  const fundRaising = await prisma.fundRaising.findUnique({
    where: {
      id: data.id,
    },
  });

  if (fundRaising) {
    let fund = await prisma.fundRaising.update({
      where: {
        id: data.id,
      },
      data: {
        active: data.status,
      },
    });

    await prisma.$disconnect();
    return fund;
  }
  return null;
};

const UpdateAmount = async (data) => {
  const fundRaising = await prisma.fundRaising.findUnique({
    where: {
      id: data.id,
    },
  });

  if (fundRaising) {
    let res = await prisma.fundRaising.update({
      where: {
        id: data.id,
      },
      data: {
        amount: data.amount,
      },
    });

    await prisma.$disconnect();
    return res;
  }
  return null;
};

const Donate = async (data) => {
  const fundRaising = await prisma.fundRaising.findUnique({
    where: {
      id: data.fundId,
    },
  });

  if (fundRaising) {
    const donation = await prisma.fundRaisingDonation.create({
      data: {
        id: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.tel,
        amount: data.amount,
        date: new Date(Date.now()),
        fundId: data.fundId,
      },
    });

    await prisma.fundRaising.update({
      where: {
        id: fundRaising.id,
      },
      data: {
        amountPaid: fundRaising.amountPaid + data.amount,
      },
    });
    await prisma.$disconnect();

    return donation;
  }
  return null;
};

const GetFundDonors = async (id) => {
  let donors = await prisma.fundRaisingDonation.findMany({
    where: {
      fundId: id,
    },
  });

  await prisma.$disconnect();
  return donors;
};

module.exports = {
  Create,
  GetFundRaising,
  UpdateAmount,
  UpdateStatus,
  Donate,
  GetFundDonors
};
