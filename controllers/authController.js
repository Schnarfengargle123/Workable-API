const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res) => {
  const employee = {
    email: req.body.email,
    username: req.body.username,
    // password: hashedPassword,
    password: req.body.password,
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

  if (req.body.confirmPassword) {
    console.log("confirmPassword: ", req.body.confirmPassword);

    if (body("email").isEmail() || body("password").isLength({ min: 8 })) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    }

    const userPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    employee.password = hashedPassword;

    console.log(hashedPassword);

    const createdEmployee = await prisma.employee.create({ data: employee });
    // .then(async () => {
    //   await prisma.$disconnect();
    // })
    // .catch(async (e) => {
    //   console.error(e);
    //   await prisma.$disconnect();
    //   process.exit(1);
    // });

    console.log("Prisma createEmployee: " + createdEmployee);
    console.log(req.body);
    res.send(employee);
  } else {
    const exisitingUserPassword = await prisma.employee.findUnique({
      where: { email: employee.email },
      select: { password: true },
    });

    const loggedInUser = await prisma.employee.findUnique({
      where: { email: employee.email },
    });

    const checkPassword = bcrypt.compare(
      employee.password,
      exisitingUserPassword,
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );

    // const checkPassword = bcrypt.compare(
    //   employee.password,
    //   loggedInUser.password,
    //   (err, result) => {
    //     console.log(err);
    //     console.log(result);
    //   }
    // );

    if (!loggedInUser) {
      res.status(400);
      res.send("No user found!");
    } else if (loggedInUser && checkPassword) {
      console.log(loggedInUser);
      res.send(loggedInUser);
    }
  }
};
