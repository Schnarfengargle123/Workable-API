const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const shiftsController = require("../controllers/shiftsController");

router.get("/", (req, res) => {
  res.send("<h2>Welcome to Workable, again!</h2>");
});

router.get("/login", (req, res) => {
  res.send("<h2>Login</h2>");
});

router.get("/staff", async (req, res) => {
  const employees = await prisma.employee.findMany();
  console.log(employees);
  res.send(employees);
});

router.get("/shifts", shiftsController.shifts);

// router.post("/auth", (req, res) => {
//   // const loggedInUser = {
//   //   email: req.body.email,
//   //   username: req.body.username,
//   //   password: req.body.password,
//   //   confirmPassword: req.body.confirmPassword,
//   // };

//   // let loggedInUser = {
//   //   username: req.body.username,
//   //   email: req.body.email,
//   // };

//   // res.json(loggedInUser);
//   console.log(req.body);
//   res.send(req.body);

//   // res.json(req.body);

//   // res.send("I AM RESPONSE");
//   // res.send(loggedInUser);
// });

router.post(
  "/auth",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);
    res.send(req.body);
  }
); // Works if `app.use(express.json());` is used in index.js

// router.post("/auth", express.json(), (req, res) => {
//   res.json(req.body);
// }); // Works!

// router.post("/auth", express.json({ type: "*/*" }), (req, res) => {
//   res.json(req.body);
// });

// router.post("/auth", (req, res) => {
//   const data = req.body.json();
//   res.send(data);
// }); // Doesn't work!

module.exports = router;
