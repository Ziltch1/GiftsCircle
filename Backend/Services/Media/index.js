const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const GetEventMediaFiles = async (id) => {
  const mediaFiles = await prisma.media.findMany({
    where: {
      eventId: id,
      uploadedBy: "HOST",
    },
    orderBy: [
      {
        date: "desc",
      },
    ],
    select: {
      url: true,
      date: true,
      id: true,
      visibility: true,
    },
  });
  await prisma.$disconnect();
  return mediaFiles;
};

const GetEventGuestMedia = async (id) => {
  const mediaFiles = await prisma.media.findMany({
    where: {
      eventId: id,
      uploadedBy: "GUEST",
    },
    orderBy: [
      {
        date: "desc",
      },
    ],
    include: {
      user: true,
    },
  });
  let list = [];
  mediaFiles.forEach((ele) => {
    let data = {};
    (data.id = ele.id),
      (data.url = ele.url),
      (data.visibility = ele.visibility),
      (data.user = ele.user.firstname + " " + ele.user.lastname);
    list.push(data);
  });

  await prisma.$disconnect();
  return list;
};

const GetGuestSentMedia = async (eventId, userId) => {
  const mediaFiles = await prisma.media.findMany({
    where: {
      eventId: eventId,
      userId: userId,
    },
    orderBy: [
      {
        date: "desc",
      },
    ],
    select: {
      url: true,
      date: true,
      id: true,
      visibility: true,
    },
  });
  await prisma.$disconnect();
  return mediaFiles;
};

const GetComplimentaryMessage = async (eventId) => {
  const messages = await prisma.complimentaryMessage.findMany({
    where: {
      eventId: eventId,
    },
    include: {
      user: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
    },
  });

  await prisma.$disconnect();
  return messages;
};

const Create = async (data, url) => {
  let id = uuidv4();
  let Data = await prisma.media.create({
    data: {
      id: id,
      user: {
        connect: {
          id: data.userId,
        },
      },
      eventId: data.eventId,
      url: url,
      uploadedBy: data.uploadedBy,
    },
  });

  const user = await prisma.user.findFirst({ where: { id: data.userId } });
  const event = await prisma.event.findFirst({ where: { id: data.eventId } });
  const message = `Media : ${user.firstname} sent you a media file`;
  const notification = await prisma.notifications.create({
    data: {
      userId: event.user_id,
      type: "MEDIA",
      message: message,
    },
  });

  const guestMessage = `Media : Media file has been sent to the host`;
  const guestNotification = await prisma.notifications.create({
    data: {
      userId: data.userId,
      type: "MEDIA",
      message: guestMessage,
    },
  });

  await prisma.$disconnect();
  return { Data, notification, guestNotification };
};

const UpdateVisibility = async (id, data) => {
  let Data = await prisma.media.update({
    where: {
      id: id,
    },
    data: {
      visibility: data.visibility,
    },
  });

  await prisma.$disconnect();
  return Data;
};

const CreateComplimentaryMessage = async (data) => {
  let id = uuidv4();
  let Data = await prisma.complimentaryMessage.create({
    data: {
      id: id,
      userId: data.userId,
      eventId: data.eventId,
      message: data.message,
    },
  });
  const user = await prisma.user.findFirst({ where: { id: data.userId } });
  const event = await prisma.event.findFirst({ where: { id: data.eventId } });
  const message = `Media : ${user.firstname} sent you a complimentary message`;
  const notification = await prisma.notifications.create({
    data: {
      userId: event.user_id,
      type: "MEDIA",
      message: message,
    },
  });

  const guestMessage = `Media : Complimentary mesage has been sent to the host`;
  const guestNotification = await prisma.notifications.create({
    data: {
      userId: data.userId,
      type: "MEDIA",
      message: guestMessage,
    },
  });

  await prisma.$disconnect();
  return { Data, notification, guestNotification };
};

const Delete = async (id) => {
  let media = await prisma.media.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return media;
};

module.exports = {
  GetGuestSentMedia,
  GetEventMediaFiles,
  GetEventGuestMedia,
  GetComplimentaryMessage,
  Create,
  CreateComplimentaryMessage,
  UpdateVisibility,
  Delete,
};
