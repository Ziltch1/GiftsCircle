const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

const Get = async (id) => {
  const giftItem = await prisma.giftitem.findUnique({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return giftItem;
};

const GetAllMediaFiles = async () => {
  const mediaFiles = await prisma.mediaFile.findMany({});
  await prisma.$disconnect();
  return mediaFiles;
};

const GetEventMediaFiles = async (id) => {
  const mediaFiles = await prisma.media.findMany({
    where: {
      eventId: id,
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
      uploadedBy: "GUEST",
    },
  });

  await prisma.$disconnect();
  return Data;
};

const Update = async (id, data, image) => {
  const giftItem = await prisma.giftitem.findUnique({
    where: {
      id: id,
    },
  });

  if (giftItem) {
    let Data = await prisma.giftitem.update({
      where: {
        id: id,
      },
      data: {
        image: image ? image : giftItem.image,
        amount: data.amount ? parseInt(data.amount) : giftItem.amount,
        details: data.details ? data.details : giftItem.details,
        category: data.category ? data.category : giftItem.category,
        title: data.title ? data.title : giftItem.title,
      },
    });

    await prisma.$disconnect();
    return Data;
  }
  return null;
};

const Delete = async (id) => {
  let giftItem = await prisma.giftitem.delete({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return giftItem;
};

module.exports = {
  GetAllMediaFiles,
  GetEventMediaFiles,
  Create,
  CreateMediaFile,
};
