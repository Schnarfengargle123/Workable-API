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
  res.send("Welcome to Workable!");
});

router.post("/auth", authController.auth);

router.get("/staff", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.send(employees);
});

router.get("/holidays", async (req, res) => {
  const holidays = await prisma.holiday.findMany();
  res.send(holidays);
});

// Protected Route

router.post("/shift_manager", authenticateToken, (req, res) => {
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

module.exports = router;

// const {package} = require('package'); // CJS (Common JS)

// import {package} from 'package'; // ESM (EcmaScript Modules)
