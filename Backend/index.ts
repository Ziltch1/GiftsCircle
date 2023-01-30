const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// when you are using a fetch api or just ajax you need to add the line below for it to work
app.use(express.json());
// assuming you are sending from a form you need to add the line below for it work.
app.use(express.urlencoded({ extended: false }));

// app.use("/", require("./apis/admin"));
// app.use("/user", require("./apis/user"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
