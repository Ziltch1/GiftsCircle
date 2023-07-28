const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetLocationData = async () => {
  const data = await prisma.sms.findMany({});
  await prisma.$disconnect();
  return data;
};

const CreateLocation = async (data) => {
  const coordinates = data.Body.split(",");
  console.log(data.From, coordinates);

  let Data = await prisma.sms.create({
    data: {
      latitude: coordinates[1],
      longitude: coordinates[0],
      sender: data.From,
    },
  });
  await prisma.$disconnect();

  return Data;
};

module.exports = {
  CreateLocation,
  GetLocationData,
};
