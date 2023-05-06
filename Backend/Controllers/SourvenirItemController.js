const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const router = express.Router();
const cloudinary = require("../config/Cloudinary");
const { upload, dataUri } = require("../config/multer");
const {
  Get,
  GetAll,
  Create,
  Update,
  Delete,
} = require("../Services/sourvenirItem");
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  try {
    let data = await Get(req.params.id);
    if (data) {
      return res.status(200).send(data);
    }
    return res
      .status(400)
      .send(ResponseDTO("Failed", "Sourvenir Item not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/Get/All", async (req, res) => {
  try {
    let data = await GetAll();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const file = dataUri(req).content;
    const response = await cloudinary.uploader.upload(file, {
      folder: "eventcircle/sourvenir",
    });
    let data = await Create(req.body, response.url);

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const file = dataUri(req).content;
    const response = await cloudinary.uploader.upload(file, {
      folder: "eventcircle/sourvenir",
    });
    let data = await Update(req.params.id, req.body, response.url);
    if (data) {
      return res.status(200).send(data);
    }
    return res
      .status(400)
      .send(ResponseDTO("Failed", "Sourvenir Item not found"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Delete(req.params.id);
    return res
      .status(200)
      .send(
        ResponseDTO(
          "Success",
          `Sourvenir Item with id ${req.params.id} deleted successfully`
        )
      );
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

module.exports = router;

//  188c3957-c71e-4e88-8264-60d4fcab89cb  a17bd3cb-1fab-479d-b975-da2b4a4c598b  78e32344-5d6d-415e-8a54-b7050e10263b 996be685-b1f2-4403-9d2e-8501e3b536c3 24fecb8f-5a5a-4cc3-bb5c-d288ff234423 0003aab9-0adb-4572-9d49-256ff694358c
// 59665913-2d04-442b-bfca-af25d1ca417e 85268856-2412-4a22-a801-3da479b452a0  24e6b9bc-0dad-4b19-ac39-d0d3c9d6f316  264a8064-b716-4d69-a4f1-2f84f5d91384
// 01f904f4-0dec-4e96-9d50-6aef922a2dfc  c6a5240a-bc71-44fe-8ff4-8f0d10d25ec7  6fad4521-2977-418f-92ab-36df00a795d9 8e05a6c6-e6e2-4c67-997e-23a79c4e4658
// d2f1d406-6652-469a-8c74-3512a4ee8521 8538d185-6886-4d70-b297-b093b557dcd5  9c8dc6d3-4d56-45fd-84e0-fe20d55e7dde 5e7fad7e-27f9-4216-b479-5078b6f47f9d
//  705df5da-669d-4494-80bf-648910a32606