const { VerifyToken } = require("../Services/Auth/services");

const EnsureAuthenticated = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    try {
      VerifyToken(token);
      next();
    } catch (err) {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  } //56ebdd0a-e340-486a-a918-fb7452bdfe4a
};

module.exports = EnsureAuthenticated;
