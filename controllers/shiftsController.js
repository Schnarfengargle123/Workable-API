const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.shifts = async (req, res) => {
  const shifts = await prisma.shift.findMany();
  console.log(shifts);
  res.send(shifts);
};

// router.get("/staff", async (req, res) => {
//   const users = await prisma.user.findMany();
//   console.log(users);
//   res.send(users);
// });
