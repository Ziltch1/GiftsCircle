const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const router = express.Router();
const EnsureAuthenticated = require("../Utils/EnsureAuthenticated");
const {
  GetFundRaising,
  Create,
  UpdateAmount,
  UpdateStatus,
  Donate,
  GetFundDonors,
  DeleteFundRaising,
} = require("../Services/FundRaising");
const cloudinary = require("../config/Cloudinary");
const { upload, dataUri } = require("../config/multer");
const prisma = new PrismaClient();

router.get("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetFundRaising(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post(
  "/create",
  upload.single("image"),
  EnsureAuthenticated,
  async (req, res) => {
    try {
      const file = dataUri(req).content;
      const response = await cloudinary.uploader.upload(file, {
        folder: "eventcircle/fundRaising",
      });
      let data = await Create(req.body, response.url);
      if (data) {
        req.io.emit(data.notification.userId, data.notification);
        return res.status(200).send(data.fundRaising);
      }
      return res.status(400).send(ResponseDTO("Failed", "Event not found"));
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
    }
  }
);

router.put("/UpdateAmount", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await UpdateAmount(req.body);
    if (data) {
      return res.status(200).send(data);
    }
    return res
      .status(400)
      .send(ResponseDTO("Failed", "Fund Raising Details not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.put("/UpdateStatus", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await UpdateStatus(req.body);
    if (data) {
      return res.status(200).send(data);
    }
    return res
      .status(400)
      .send(ResponseDTO("Failed", "Fund Raising Details not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post("/Donate", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await Donate(req.body);
    if (data) {
      req.io.emit(data.notification.userId, data.notification);
      req.io.emit(data.guestNotification.userId, data.guestNotification);
      return res.status(200).send(data.donation);
    }
    return res
      .status(400)
      .send(ResponseDTO("Failed", "Fund raising Details not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/GetFundDonors/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetFundDonors(req.params.id);

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.delete("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    await DeleteFundRaising(req.params.id);
    return res
      .status(200)
      .send(
        ResponseDTO(
          "Success",
          `FundRaising with id ${req.params.id} deleted successfully`
        )
      );
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

module.exports = router;
