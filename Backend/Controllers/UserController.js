const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const {
  ChangePassword,
  GetUser,
  GetUsers,
  DeleteUser,
  UpdateUser,
  GetUserNotifications,
  UpdateNotifications,
} = require("../Services/Users");
const EnsureAuthenticated = require("../Utils/EnsureAuthenticated");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetUser(req.params.id);
    if (data) {
      return res.status(200).send({ user: data });
    }
    return res.status(400).send(ResponseDTO("Failed", "User not Found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/notifications/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetUserNotifications(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "User not Found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.put("/notifications/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await UpdateNotifications(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send(ResponseDTO("Failed", "User not Found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/users/GetAll", async (req, res) => {
  try {
    let data = await GetUsers();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.delete("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    await DeleteUser(req.params.id);
    return res
      .status(200)
      .send(
        ResponseDTO(
          "Success",
          `user with id ${req.params.id} deleted successfully`
        )
      );
  } catch (err) {
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "User not found"));
  }
});

router.post("/changePassword", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await ChangePassword(req.body);
    if (data) {
      res
        .status(201)
        .send(ResponseDTO("Success", "Password changed successfully"));
    }
    return res.status(400).send(ResponseDTO("Failed", "Password is Incorrect"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.put("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await UpdateUser(req.body, req.params.id);
    if (data) {
      req.io.emit(data.notification.userId, data.notification);
      return res.status(201).send(data.updatedUser);
    }
    return res.status(400).send(ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

module.exports = router;
