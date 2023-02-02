const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const { ChangePassword, GetUser } = require("../Services/Users");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  try {
    let data = await GetUser(req.params.id);
    if (data) {
      return res.status(200).send({ user: data });
    }
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "User not found" });
  }
});

router.post("/changePassword", async (req, res) => {
  try {
    let data = await ChangePassword(req.body);
    if (data) {
      res
        .status(201)
        .send(new ResponseDTO("Success", "Password changed successfully"));
    }
    return res
      .status(400)
      .send(new ResponseDTO("Failed", "Password is Incorrect"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

module.exports = router;
