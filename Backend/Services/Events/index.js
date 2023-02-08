const { PrismaClient } = require("@prisma/client");
const { CreateEventId } = require("./service");
const prisma = new PrismaClient();

const GetEvent = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return event;
};

const GetUserEvents = async (id) => {
  const events = await prisma.event.findMany({
    where: {
      user_id: id,
    },
  });
  await prisma.$disconnect();
  return events;
};

const Create = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  let id = CreateEventId();
  if (user) {
    await prisma.event.create({
      data: {
        id: id,
        title: data.title,
        category: data.category,
        venue: data.venue,
        date: new Date(data.date),
        start_time: data.start_time,
        end_time: data.end_time,
        timezone: data.timezone,
        host: data.host,
        user_id: data.userId,
        co_hosts: undefined,
        published: false,
        applyDonation: false,
        percentDonation: 0,
        created_at: new Date(Date.now()),
      },
    });

    await prisma.$disconnect();
    return data;
  }
  return null;
};

const Update1 = async (data, image) => {
  const event = await prisma.event.findUnique({
    where: {
      id: data.id,
    },
  });

  if (event) {
    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        image: image,
        descCeleb: data.desc_celeb,
        descSummary: data.desc_summary,
        summary: data.summary,
      },
    });

    await prisma.$disconnect();
    return data;
  }
  return null;
};

module.exports = { Create, Update1, GetEvent, GetUserEvents };