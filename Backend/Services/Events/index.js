const { PrismaClient } = require("@prisma/client");
const { CreateEventId, CreateCoHostId, CreateGuestId } = require("./service");
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

const GetAllEvents = async () => {
  const events = await prisma.event.findMany();

  await prisma.$disconnect();
  return events;
};

const GetUserEvents = async (id) => {
  const events = await prisma.event.findMany({
    where: {
      user_id: id,
    },
    include:{
      gifts: {
        select: {
          giftItemId: true
        }
      }
    }
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

  if (user) {
   let event = await prisma.event.create({
      data: {
        id: CreateEventId(),
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
        coHostCode: CreateCoHostId(),
        coHostLink: "",
        guestCode: CreateGuestId(),
        eventLink: "",
        percentDonation: 0,
        created_at: new Date(Date.now()),
      },
    });

    await prisma.$disconnect();
    return event;
  }
  return null;
};


const Update1 = async (data) => {
  const event = await prisma.event.findUnique({
    where: {
      id: data.id,
    },
  });

  if (event) {
   let event = await prisma.event.update({
    where:{
      id:data.id
    },
      data: {
        title: data.title,
        category: data.category,
        venue: data.venue,
        date: new Date(data.date),
        start_time: data.start_time,
        end_time: data.end_time,
        timezone: data.timezone,
        host: data.host,
        created_at: new Date(Date.now()),
      },
    });

    await prisma.$disconnect();
    return event;
  }
  return null;
};

const Update2 = async (data, image) => {
  const event = await prisma.event.findUnique({
    where: {
      id: data.id,
    },
  });

  if (event) {
    let res = await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        image: image,
        descSummary: data.desc_summary,
        summary: data.summary,
      },
    });

    await prisma.$disconnect();
    return res;
  }
  return null;
};

const Update3 = async (data) => {
  const event = await prisma.event.findUnique({
    where: {
      id: data.id,
    },
  });

  if (event) {
    let Data = await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        published: data.published,
        percentDonation: data.percentDonation,
        applyDonation: data.applyDonation,
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
};

const DeleteEvent = async (id) => {
  let event = await prisma.event.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return event;
};

module.exports = { Create, Update1, Update2, Update3, GetEvent, GetAllEvents, GetUserEvents, DeleteEvent };
