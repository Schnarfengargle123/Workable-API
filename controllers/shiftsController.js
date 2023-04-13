const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CRUD (Create • Read • Update • Delete)

// CREATE
exports.createShift = async (req, res) => {
  // Create Shift Logic

  // We need to obtain the username associated with the shift record,
  // and then create an `employeeID` variable, which contains the
  // `employeeId` associated with said username.

  const createdShift = {
    // username: req.body.employee.username,
    date: req.body.date,
    start_time: req.body.startTime,
    finish_time: req.body.finishTime,
    duration: req.body.duration,
    employeeId: req.body.employee,
  };

  // const employeeIdValue = await prisma.shift.findUnique({
  //   where: {
  //     employee: req.body.username,
  //   },
  //   select: {
  //     employeeId: true,
  //   },
  //   // include: {
  //   //   employee: {},
  //   // },
  // });

  await prisma.shift.create({
    // include: {
    //   shift: {
    //     select: {
    //       employeeId: {
    //         where: {
    //           username: createdShift.username,
    //         },
    //       },
    //     },
    //   },
    // },

    // include: {
    //   employee: true,
    // },

    data: {
      date: req.body.date,
      start_time: req.body.startTime,
      finish_time: req.body.finishTime,
      duration: req.body.duration,
      employeeId: req.body.employee,
    },

    // data: {
    //   date: createdShift.date,
    //   start_time: createdShift.start_time,
    //   finish_time: createdShift.finish_time,
    //   duration: createdShift.duration,
    //   employeeId: createdShift.employeeId,
    // },
  });

  console.log("Created Shift: ", createdShift);

  res.send(req.body);

  // res.send(employeeIdValue);

  //   model Shift {
  //   id          Int      @id @default(autoincrement())
  //   date        String
  //   duration    String
  //   start_time  String
  //   finish_time String
  //   employee    Employee     @relation(fields: [employeeId], references: [id])
  //   employeeId Int
  // }
};

// READ
exports.shifts = async (req, res) => {
  const shifts = await prisma.shift.findMany({
    // // Includes related Employee object as a data column value of Shift.
    // include: {
    //   employee: true,
    // },

    // select: {
    //   employee: {
    //     select: {
    //       username: true,
    //     },
    //   },
    // },

    // Includes specific data column value from Employee,
    // as a data column value of Shift.
    include: {
      employee: {
        select: {
          username: true,
        },
      },
    },

    // select: {
    //   employee: {
    //     select: {
    //       id: true,
    //     },
    //   },
    // },
  });

  console.log(req.query);
  // console.log(shifts);
  res.send(shifts);
};

// UPDATE
exports.updateShift = (req, res) => {
  const updatedData = {
    date: req.body.date,
    start_time: req.body.start_time,
    finish_time: req.body.finish_time,
    duration: req.body.duration,
  };

  res.send(req.body);
};

exports.deleteShift = (req, res) => {
  // Delete Logic
};

// router.get("/staff", async (req, res) => {
//   const users = await prisma.user.findMany();
//   console.log(users);
//   res.send(users);
// });
