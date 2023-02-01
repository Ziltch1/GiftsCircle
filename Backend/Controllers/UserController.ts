import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { ChangePassword, Create, GetUser } from "../Services/Users";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    let data = await GetUser(req.params.id);
    if (data) {
      res.status(201).send({ user: data });
    }
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "User not found" });
  }
});

router.post("/changePassword", async (req: Request, res: Response) => {
  try {
    let data = await ChangePassword(req.body);
    if (data) {
      res.status(201).send({ msg: "Password changed successfully" });
    }
    return res.status(400).send({ msg: "Password is Incorrect" });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

module.exports = router;
