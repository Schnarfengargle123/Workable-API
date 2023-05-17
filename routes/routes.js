// const {package} = require('package'); // CJS (Common JS)
// import {package} from 'package'; // ESM (ECMAScript Modules)

const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dotenv = require("dotenv");
dotenv.config();

// access config var
// process.env.TOKEN_SECRET;

const authController = require("../controllers/authController");
const holidaysController = require("../controllers/holidaysController");
const shiftsController = require("../controllers/shiftsController");
const authenticateToken = require("../middleware/auth");

// Default route when running our server. We can redirect to another
// endpoint if required.

router.get("/", (req, res) => {
  res.send("Welcome to Workable!");
});

router.post("/auth", authController.auth);

router.get("/staff", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.send(employees);
});

// =================================================================

// CRUD (Create • Read • Update • Delete)

// CREATE

router.post("/create_holiday", holidaysController.createHoliday);

// READ

router.get("/holidays", holidaysController.holidays);

// UPDATE

router.put("/update_holiday", holidaysController.updateHoliday);

// DELETE

// router.delete("/delete_holiday", holidaysController.deleteHoliday);

router.delete("/delete_holiday/:id", holidaysController.deleteHoliday);

// Protected Route

router.get("/shift_manager", authenticateToken, (req, res) => {
  res.send("You are authorised!");
});

// =================================================================

// CRUD (Create • Read • Update • Delete)

// CREATE

router.post("/create_shift", shiftsController.createShift);

// READ

router.get("/shifts", shiftsController.shifts);

// UPDATE

router.put("/update_shift", shiftsController.updateShift);

// DELETE

router.delete("/delete_shift/:id", shiftsController.deleteShift);

module.exports = router;
