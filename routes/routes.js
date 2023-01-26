const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h2>Welcome to Workable, again!</h2>");
});

router.get("/login", (req, res) => {
  res.send("<h2>Login</h2>");
});

module.exports = router;
