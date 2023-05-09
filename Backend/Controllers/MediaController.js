const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const router = express.Router();
const cloudinary = require("../config/Cloudinary");
const { upload, dataUri, dataUriMultiple } = require("../config/multer");
const EnsureAuthenticated = require("../Utils/EnsureAuthenticated");
const {
  Create,
  CreateMediaFile,
  GetAllMediaFiles,
} = require("../Services/Media");
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
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/Get/AllMediaFiles", async (req, res) => {
  try {
    let data = await GetAllMediaFiles();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get("/Get/EventMediaFiles/:id", async (req, res) => {
  try {
    let data = await GetAllMediaFiles(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.post(
  "/upload",
  upload.single("media"),
  EnsureAuthenticated,
  async (req, res) => {
    try {
      let data = req.file;
      if (data.size > 100000000) {
        return res
          .status(400)
          .send(ResponseDTO("Failed", "Files must be below 100MB"));
      } else {
        const file = dataUri(req).content;
        let response = await cloudinary.uploader.upload(file, {
          folder: "eventcircle/media",
          resource_type: "video",
        });
        return res.status(200).send(response.url);
      }
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
    }
  }
);

router.post(
  "/UploadImages",
  upload.array("media"),
  EnsureAuthenticated,
  async (req, res) => {
    try {
      let data = req.files;
      let Data = await Create(req.body);
      if (Data) {
        data.map((ele) => {
          const file = dataUriMultiple(ele).content;

          cloudinary.uploader
            .upload(file, {
              folder: "eventcircle/media",
            })
            .then((response) => {
              CreateMediaFile(response.url, Data.id);
            })
            .catch((err) => console.log(err));
        });

        return res.status(200).send(Data);
      }
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
    }
  }
);

router.post("/UploadVideo", EnsureAuthenticated, async (req, res) => {
  try {
    let Data = await Create(req.body);
    if (Data) {
      await CreateMediaFile(req.body.video, Data.id);
    }
    return res.status(200).send(Data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let data = null;
    if (req.file) {
      const file = dataUri(req).content;
      const response = await cloudinary.uploader.upload(file, {
        folder: "eventcircle",
      });
      data = await Update(req.params.id, req.body, response.url);
      if (data) {
        return res.status(200).send(data);
      }
      return res.status(400).send(ResponseDTO("Failed", "GiftItem not found"));
    } else {
      data = await Update(req.params.id, req.body, null);
      if (data) {
        return res.status(200).send(data);
      }
      return res.status(400).send(ResponseDTO("Failed", "GiftItem not found"));
    }
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
          `GiftItem with id ${req.params.id} deleted successfully`
        )
      );
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

module.exports = router;
