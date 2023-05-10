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
  GetGuestSentMedia,
  GetEventGuestMedia,
  GetEventMediaFiles,
  Delete,
} = require("../Services/Media");
const prisma = new PrismaClient();

router.get(
  "/Get/EventMediaFiles/:id",
  EnsureAuthenticated,
  async (req, res) => {
    try {
      let data = await GetEventMediaFiles(req.params.id);
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
    }
  }
);

router.get("/Get/GuestSentFiles/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetEventGuestMedia(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
  }
});

router.get(
  "/Get/GuestSentMedia/:eventId/:userId",
  EnsureAuthenticated,
  async (req, res) => {
    try {
      let data = await GetGuestSentMedia(req.params.eventId, req.params.userId);
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
      await prisma.$disconnect();
      return res.status(400).send(ResponseDTO("Failed", "Request Failed"));
    }
  }
);

router.post(
  "/upload",
  upload.single("image"),
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
      await CreateMediaFile(req.body.files, Data.id);
    }
    return res.status(200).send(Data);
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
          `Media with id ${req.params.id} deleted successfully`
        )
      );
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

module.exports = router;
