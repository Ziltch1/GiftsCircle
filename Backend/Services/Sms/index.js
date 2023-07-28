const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetLocationData = async () => {
  const data = await prisma.sms.findMany({});
  await prisma.$disconnect();
  return data;
};

const CreateLocation = async (data) => {
  console.log(data);
  let Data = await prisma.sms.create({
    data: {
      latitude: data.latitude,
      longitude: data.longitude,
      sender: data.sender,
    },
  });
  await prisma.$disconnect();

  return Data;
};

module.exports = {
  CreateLocation,
  GetLocationData,
};
