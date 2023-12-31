const dayjs = require("dayjs");
var express = require("express");
require("dotenv").config();
var router = express.Router();
var app = express();
/* GET home page. */
router.get("/", function (req, res, next) {
  const date = dayjs().format(" YYYY-MM-DDT HH");
  if (process.env.TOKEN === req.headers.token) {
    if (date !== app.get("time")) {
      require("crypto").randomBytes(48, function (err, buffer) {
        var token = buffer.toString("hex");
        app.set("token", token);
        app.set("time", date);
        res.status(200).json({ token: token });
      });
    } else {
      res.status(200).json({ token: app.get("token") });
    }
  } else {
    res.status(200).json({ err: "lost token" });
  }
});

module.exports = router;
