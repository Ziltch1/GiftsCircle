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
  GetUserPurchasedGifts,
  BuyMarketGift,
  GetUserGifts,
  Buy,
  GetEventGiftTransactions,
  GetUserEventPurchasedGifts,
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
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/Get/All", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetAll();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/Get/EventGifts/:id/:userId", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetEventGifts(req.params.id, req.params.userId);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get(
  "/Get/EventGiftsTrans/:id",
  EnsureAuthenticated,
  async (req, res) => {
    try {
      let data = await GetEventGiftTransactions(req.params.id);
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
    }
  }
);

router.get(
  "/Get/UserEventGiftsTrans/:id/:eventId",
  EnsureAuthenticated,
  async (req, res) => {
    try {
      let data = await GetUserEventPurchasedGifts(
        req.params.id,
        req.params.eventId
      );
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
    }
  }
);

router.get("/Get/PurchasedBy/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetUserPurchasedGifts(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post("/create", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await Create(req.body);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post("/createMany", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await CreateMany(req.body);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post("/Buy", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await Buy(req.body);
    if (data) {
      req.io.emit(data.notification.userId, data.notification);
      req.io.emit(data.guestNotification.userId, data.guestNotification);
      return res.status(200).send(data.transactions);
    }
    return res
      .status(400)
      .send(ResponseDTO("Failed", "Asoebi Details not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
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
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
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
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.delete("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    await Delete(req.params.id);
    return res
      .status(200)
      .send(
        ResponseDTO(
          "Success",
          `Gift with id ${req.params.id} deleted successfully`
        )
      );
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

module.exports = router;
