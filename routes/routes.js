const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dotenv = require("dotenv");
dotenv.config();

// access config var
// process.env.TOKEN_SECRET;

const authController = require("../controllers/authController");
const shiftsController = require("../controllers/shiftsController");
const authenticateToken = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("<h2>Welcome to Workable, again!</h2>");
});

router.get("/login", (req, res) => {
  res.send("<h2>Login</h2>");
});

router.get("/staff", async (req, res) => {
  const employees = await prisma.employee.findMany();
  // console.log(employees);
  res.send(employees);
});

router.get("/holidays", async (req, res) => {
  const holidays = await prisma.holiday.findMany();
  // console.log(holidays);
  res.send(holidays);
});

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
  // body("email").isEmail(),
  // body("password").isLength({ min: 8 }),
  authController.auth
  // async (req, res) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   const userPassword = req.body.password;
  //   const hashedPassword = await bcrypt.hash(userPassword, 10);

  //   console.log(hashedPassword);

  //   const employee = {
  //     email: req.body.email,
  //     username: req.body.username,
  //     password: hashedPassword,
  //     admin: false,
  //     token: null,
  //   };

  //   const token = jwt.sign(
  //     {
  //       email: employee.email,
  //       username: employee.username,
  //     },
  //     process.env.TOKEN_SECRET,
  //     { expiresIn: "1h" }
  //   );

  //   employee.token = token;

  //   const createEmployee = await prisma.employee
  //     .create({ data: employee })
  //     .then(async () => {
  //       await prisma.$disconnect();
  //     })
  //     .catch(async (e) => {
  //       console.error(e);
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     });

  //   console.log("Prisma createEmployee: " + createEmployee);
  //   console.log(req.body);
  //   res.send(req.body);
  //   // res.send({ requestBody: req.body, token });
  // }
); // Works if `app.use(express.json());` is used in index.js

router.post("/shift_manager", authenticateToken, (req, res) => {
  // Protected Route
  res.send("You are authorised!");
});

// ============================================================

// CRUD (Create • Read • Update • Delete)

// CREATE

router.post("/create_shift", shiftsController.createShift);

// READ

router.get("/shifts", shiftsController.shifts);

// UPDATE

router.put("/update_shift", shiftsController.updateShift);

// DELETE

router.delete("/delete_shift/:id", shiftsController.deleteShift);

// const deleteShift = await prisma.shift
//   .delete({
//     where: {
//       id: deletedShiftID,
//     },
//   })

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

router.get("/products", (req, res) => {
  const products = [
    {
      title: "Mug",
      description: "A wonderful mug, suitable for tea & coffee.",
      price: 2.99,
    },
    {
      title: "Coaster",
      description: "The perfect companion to your most treasured mug.",
      price: 1.99,
    },
  ];

  res.send(products);
});

// ?condition=new?price=9.99?Home & Kitchen

// router.get("/products", (req, res) => {
router.get("/products/:id", (req, res) => {
  const products = [
    {
      id: 1,
      title: "Mug",
      description: "A wonderful mug, suitable for tea & coffee.",
      condition: "New",
      category: "Home & Kitchen",
      price: 2.99,
    },
    {
      id: 2,
      title: "Coaster",
      description: "The perfect companion to your most treasured mug.",
      condition: "Used",
      price: 1.99,
    },
  ];

  const queryString = "Home & Kitchen";

  queryString[0].toUpperCase();
  queryString[7].toUpperCase();

  console.log(req.query.condition);

  res.send(req.query.condition);
  // res.send(products[req.params.id - 1]);
});

module.exports = router;
