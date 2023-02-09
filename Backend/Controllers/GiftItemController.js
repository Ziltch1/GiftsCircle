const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const router = express.Router();
const multer = require("multer");
const { Get, GetAll, Create, Update, Delete } = require("../Services/GiftItem");

const upload = multer({ dest: "images/giftItems/" });
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  try {
    let data = await Get(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "GiftItem not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.get("/Get/All", async (req, res) => {
  try {
    let data = await GetAll();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const image = req.file.filename;
    let data = await Create(req.body, image);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    let data = await Update(req.params.id, req.body, image);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "GiftItem not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Delete(req.params.id);
    return res
      .status(200)
      .send({ msg: `GiftItem with id ${req.params.id} deleted successfully` });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

module.exports = router;
