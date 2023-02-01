import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import ResponseDTO from "../DTO/Request/Response";
import {
  GoogleSignIn,
  Login,
  SendVerifyEmail,
  VerifyEmail,
} from "../Services/Auth";
import { Create, SetPassword } from "../Services/Users";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req: Request, res: Response) => {
  try {
    let data = await Login(req.body);
    if (typeof data === typeof ResponseDTO) {
      return res.status(400).send(data);
    }
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    let data = await Create(req.body);
    if (data) {
      return res.status(201).send(data);
    }
    return res.status(400).send({ msg: "User already exists" });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/googleSignin", async (req: Request, res: Response) => {
  try {
    let data = await GoogleSignIn(req.body);
    if (data) {
      res.status(200).send(data);
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/setPassword", async (req: Request, res: Response) => {
  try {
    let data = await SetPassword(req.body, "SET");
    if (data) {
      res
        .status(201)
        .send(new ResponseDTO("Success", "Password set successfully"));
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/resetPassword", async (req: Request, res: Response) => {
  try {
    let data = await SetPassword(req.body, "RESET");
    if (data) {
      res
        .status(201)
        .send(new ResponseDTO("Success", "Password reset successfully"));
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/verifyEmail", async (req: Request, res: Response) => {
  try {
    let data = await VerifyEmail(req.body);
    if (data) {
      res
        .status(201)
        .send(new ResponseDTO("Success", "Email verified successfully"));
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

router.post("/sendVerifyEmail", async (req: Request, res: Response) => {
  try {
    let data = await SendVerifyEmail(req.body.email);
    if (data.status) {
      res
        .status(201)
        .send(new ResponseDTO("Success", "Email sent successfully"));
    }
    return res.status(400).send(new ResponseDTO("Failed", "User not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    res.status(400).send({ msg: "Request Failed" });
  }
});

module.exports = router;
