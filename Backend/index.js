const express = require("express");
const swaggerDocument = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      // "http://localhost:3001",
      // "https://giftscircle.netlify.app",
    ],
  },
});
let Socket;

io.on("connection", (socket) => {
  Socket = socket;
});

app.use(function (req, res, next) {
  req.io = Socket;
  next();
});

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use(
  "/api/sourvenirItem/",
  require("./Controllers/SourvenirItemController")
);
app.use("/api/marketPlace/", require("./Controllers/MarketplaceController"));
app.use("/api/media/", require("./Controllers/MediaController"));
app.use("/api/complimentaryGift/", require("./Controllers/ComplimentaryGift"));
app.use("/api/gift/", require("./Controllers/GiftController"));
app.use("/api/asoebi/", require("./Controllers/AsoebiController"));
app.use("/api/sourvenir/", require("./Controllers/SourvenirController"));
app.use("/api/delivery/", require("./Controllers/DeliveryController"));
app.use("/api/fundRaising/", require("./Controllers/FundRaisingController"));
app.use("/api/", require("./Controllers/AuthController"));

app.use("/api/docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(
//   "/api/admin/docs/",
//   swaggerUi.serve,
//   swaggerUi.setup(AdminSwaggerDocument)
// );
const PORT = process.env.PORT || 4000;

io.listen(3100);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
