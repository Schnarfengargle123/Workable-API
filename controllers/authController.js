const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const { body, validationResult, check } = require("express-validator");
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

  // Attempting to register

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

    console.log("Prisma createEmployee: " + createdEmployee);
    console.log(req.body);
    res.send(employee);

    // // Attempting to login
  } else {
    const existingUserPassword = await prisma.employee.findUnique({
      where: { email: employee.email },
      select: { password: true },
    });

    const loggedInUser = await prisma.employee.findUnique({
      where: { email: employee.email },
    });

    console.log("existingUserPassword: ", existingUserPassword); // Error
    console.log("loggedInUser: ", loggedInUser);

    let isValidLoginAttempt; // Allow bcrypt to dictate and set this value

    const checkPassword = () => {
      bcrypt.compare(
        employee.password,
        existingUserPassword.password,
        (err, result) => {
          isValidLoginAttempt = result;
          console.log("isValidLoginAttempt: ", isValidLoginAttempt);

          console.log("err: ", err);
          console.log("result: ", result);

          if (result) {
            res.send(loggedInUser);
          } else {
            res.send("Incorrect password!");
          }
        }
      );
    };

    if (!loggedInUser) {
      res.status(400);
      res.send("No user found!");
    } else if (loggedInUser) {
      checkPassword();
    }
  }
};
