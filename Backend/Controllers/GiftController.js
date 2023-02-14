const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const router = express.Router();
const {
  Get,
  GetAll,
  Create,
  Delete,
  GetEventGifts,
  CreateMany,
  EnableContribution,
} = require("../Services/Gift");
const EnsureAuthenticated = require("../Utils/EnsureAuthenticated");

const prisma = new PrismaClient();

router.get("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await Get(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "Gift not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.get("/Get/All", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetAll();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.get("/Get/EventGifts", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetEventGifts();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/create", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await Create(req.body);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/createMany", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await CreateMany(req.body);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.put("/EnableContribution", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await EnableContribution(req.body);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "Gift not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});



router.put("/EnableContribution/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await EnableContribution(req.body, req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "Gift not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.delete("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    await Delete(req.params.id);
    return res
      .status(200)
      .send({ msg: `Gift with id ${req.params.id} deleted successfully` });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

module.exports = router;
