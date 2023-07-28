const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const EnsureAuthenticated = require("../Utils/EnsureAuthenticated");
const { GetLocationData, CreateLocation } = require("../Services/Sms");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    let data = await GetLocationData();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post("/", async (req, res) => {
  try {
    let data = await CreateLocation(req.body);
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

module.exports = router;
