const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const GetEventMediaFiles = async (id) => {
  const mediaFiles = await prisma.media.findMany({
    where: {
      eventId: id,
      uploadedBy: "HOST",
    },
    select: {
      data: {
        select: {
          url: true,
        },
      },
    },
  });
  let list = [];
  mediaFiles.forEach((ele) => {
    ele.data.forEach((i) => list.push(i.url));
  });
  await prisma.$disconnect();
  return list;
};

const GetEventGuestMedia = async (id) => {
  const mediaFiles = await prisma.media.findMany({
    where: {
      eventId: id,
      uploadedBy: "GUEST",
    },
    include: {
      data: true,
      user: true,
    },
  });

  let list = [];
  mediaFiles.forEach((ele) => {
    ele.data.forEach((i) => {
      let data = {};
      (data.id = i.id),
        (data.message = i.complimentaryMessageId),
        (data.url = i.url),
        (data.user = ele.user.firstname + " " + ele.user.lastname);

      list.push(data);
    });
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
    include: {
      data: true,
    },
  });
  await prisma.$disconnect();
  return mediaFiles;
};

const CreateMediaFile = async (url, mediaId) => {
  let id = uuidv4();
  let Data = await prisma.mediaFile.create({
    data: {
      id: id,
      url: url,
      mediaId: mediaId,
    },
  });
  return Data;
};

const Create = async (data) => {
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
      uploadedBy: data.uploadedBy,
    },
  });

  await prisma.$disconnect();
  return Data;
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
  Create,
  CreateMediaFile,
  Delete,
};
