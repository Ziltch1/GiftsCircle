const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

const GetFundRaising = async (id) => {
  const fundRaising = await prisma.fundRaising.findMany({
    where: {
      eventId: id,
    },
  });
  await prisma.$disconnect();
  return fundRaising;
};

const Create = async (data, image) => {
  const event = await prisma.event.findUnique({
    where: {
      id: data.eventId,
    },
  });

  if (event) {
    const FundRaising = await prisma.fundRaising.findFirst({
      where: {
        eventId: data.eventId,
      },
    });
    if (FundRaising) {
      return FundRaising;
    }
    let fundRaising = await prisma.fundRaising.create({
      data: {
        id: uuidv4(),
        eventId: data.eventId,
        amount: parseInt(data.amount),
        amountPaid: 0,
        active: true,
        image: image,
        title: data.title,
        description: data.description,
      },
    });

    const message = `FundRaising has been created and is active`;
    const notification = await prisma.notifications.create({
      data: {
        userId: event.user_id,
        type: "FUNDRAISING",
        message: message,
      },
    });

    await prisma.$disconnect();
    return { fundRaising, notification };
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
        amount: parseInt(data.amount),
        date: new Date(Date.now()),
        fundId: data.fundId,
      },
    });

    await prisma.fundRaising.update({
      where: {
        id: fundRaising.id,
      },
      data: {
        amountPaid: fundRaising.amountPaid + parseInt(data.amount),
      },
    });
    const event = await prisma.event.findUnique({
      where: { id: fundRaising.eventId },
    });
    const message = `FundRaising: ${data.firstName} donated ${data.amount} to the FundRaising`;
    const notification = await prisma.notifications.create({
      data: {
        userId: event.user_id,
        type: "FUNDRAISING",
        message: message,
      },
    });

    const guestMessage = `FundRaising: You made a donation to ${event.title} event fundRaising`;
    const guestNotification = await prisma.notifications.create({
      data: {
        userId: data.userId,
        type: "FUNDRAISING",
        message: guestMessage,
      },
    });
    await prisma.$disconnect();

    return { donation, notification, guestNotification };
  }
  return null;
};

const GetFundDonors = async (id) => {
  let donors = await prisma.fundRaisingDonation.findMany({
    where: {
      fundId: id,
    },
    select: {
      firstName: true,
      lastName: true,
      amount: true,
      id: true,
      date: true,
    },
  });

  await prisma.$disconnect();
  return donors;
};

const DeleteFundRaising = async (id) => {
  let fundRaising = await prisma.fundRaising.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return fundRaising;
};

module.exports = {
  Create,
  GetFundRaising,
  UpdateAmount,
  UpdateStatus,
  Donate,
  GetFundDonors,
  DeleteFundRaising,
};
