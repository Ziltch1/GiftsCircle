const express = require("express");
const bodyParser = require("body-parser");
const swaggerDocument = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// when you are using a fetch api or just ajax you need to add the line below for it to work
app.use(express.json());
// app.use(bodyParser.json());

// assuming you are sending from a form you need to add the line below for it work.
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://giftscircle.netlify.app",
    ],
  })
);

app.get("/", async (req, res) => {
  return res.json({ msg: "hello world" });
});
// app.use('/images', express.static('images'))
app.use("/api/user/", require("./Controllers/UserController"));
app.use("/api/event/", require("./Controllers/EventController"));
app.use("/api/giftItem/", require("./Controllers/GiftItemController"));
app.use("/api/asoebiItem/", require("./Controllers/AsoebiItemController"));
app.use("/api/sourvenirItem/", require("./Controllers/SourvenirItemController"));
app.use("/api/complimentaryGift/", require("./Controllers/ComplimentaryGift"));
app.use("/api/gift/", require("./Controllers/GiftController"));
app.use("/api/asoebi/", require("./Controllers/AsoebiController"));
app.use("/api/delivery/", require("./Controllers/DeliveryController"));
app.use("/api/fundRaising/", require("./Controllers/FundRaising"));
app.use("/api/", require("./Controllers/AuthController"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
