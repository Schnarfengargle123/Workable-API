const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res) => {
  if (body("email").isEmail() || body("password").isLength({ min: 8 })) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const userPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(userPassword, 10);

  console.log(hashedPassword);

  const employee = {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    admin: false,
    token: null,
  };

  const token = jwt.sign(
    {
      email: employee.email,
      username: employee.username,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  employee.token = token;

  const createEmployee = await prisma.employee
    .create({ data: employee })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  console.log("Prisma createEmployee: " + createEmployee);
  console.log(req.body);
  res.send(employee);
  // res.send(req.body);
};
