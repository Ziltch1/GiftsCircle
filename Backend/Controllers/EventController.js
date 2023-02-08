const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const { Create, Update1, GetEvent, GetUserEvents } = require("../Services/Events");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "images/" });
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  try {
    let data = await GetEvent(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "Event not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.get("/UserEvents/:id", async (req, res) => {
  try {
    let data = await GetUserEvents(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "Event not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/create", async (req, res) => {
  try {
    let data = await Create(req.body);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/create2", upload.single("image"), async (req, res) => {
  try {
    const image = req.file.filename;
    let data = await Update1(req.body, image);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "Event not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

module.exports = router;
