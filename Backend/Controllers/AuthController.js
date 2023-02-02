const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const {
  GoogleSignIn,
  Login,
  SendVerifyEmail,
  VerifyOtp,
} = require("../Services/Auth");
const { Create, SetPassword } = require("../Services/Users");
const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    let data = await Login(req.body);
    if (data) {
      return res.status(200).send(data);
    }
    return res
      .status(400)
      .send(new ResponseDTO("Failed", "Email or Password is Incorrect"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/register", async (req, res) => {
  try {
    let data = await Create(req.body);
    if (data) {
      return res.status(201).send(data);
    }
    return res.status(400).send({ msg: "User already exists" });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/googleSignin", async (req, res) => {
  try {
    let data = await GoogleSignIn(req.body);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/setPassword", async (req, res) => {
  try {
    let data = await SetPassword(req.body, "SET");
    if (data) {
      return res
        .status(201)
        .send(new ResponseDTO("Success", "Password set successfully"));
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/resetPassword", async (req, res) => {
  try {
    let data = await SetPassword(req.body, "RESET");
    if (data) {
      return res
        .status(201)
        .send(new ResponseDTO("Success", "Password reset successfully"));
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/verifyEmail", async (req, res) => {
  try {
    let data = await VerifyOtp(req.body);
    if (data.Status === "Success") {
      return res.status(200).send(data);
    }
    return res.status(400).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/sendVerifyEmail", async (req, res) => {
  try {
    let data = await SendVerifyEmail(req.body.email);
    if (data.status) {
      return res
        .status(201)
        .send(new ResponseDTO("Success", "Email sent successfully"));
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

module.exports = router;
