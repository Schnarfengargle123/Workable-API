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
  // const employeeId = parseInt(req.query.employeeId);
  // const duration = req.query.duration;

  // if (employeeId) res.send(employeeId);

  if (Object.keys(req.query).length !== 0) {
    console.log("Query: ", req.query);

    const employeeId = parseInt(req.query.employeeId);
    const duration = req.query.duration;

    const filteredShift = await prisma.shift.findMany({
      where: {
        employeeId: employeeId,
      },
    });

    res.send(filteredShift);
    // res.send(employeeId);
  } else {
    const shifts = await prisma.shift.findMany({
      // // Includes related Employee object as a data column value of Shift.

      // Includes specific data column value from Employee,
      // as a data column value of Shift.
      include: {
        employee: {
          select: {
            username: true,
          },
        },
      },
    });

    console.log(req.query);
    // console.log(shifts);
    res.send(shifts);
  }
};

// UPDATE
exports.updateShift = async (req, res) => {
  // const updatedData = {
  //   date: req.body.date,
  //   start_time: req.body.start_time,
  //   finish_time: req.body.finish_time,
  //   duration: req.body.duration,
  //   empl,
  // };

  await prisma.shift.update({
    where: {
      id: req.body.id,
    },
    data: {
      date: req.body.shiftDate,
      start_time: req.body.startTime,
      finish_time: req.body.endTime,
      duration: req.body.duration,
      employeeId: req.body.employee,
    },
  });

  res.send(req.body);
};

exports.deleteShift = async (req, res) => {
  // Delete Logic

  let deletedShiftId = parseInt(req.params.id); // This also works
  console.log(req.params);

  // THIS WORKS

  const deletedShift = await prisma.shift.delete({
    where: {
      id: deletedShiftId,
      // id: parseInt(req.params.id),
    },
  });

  res.send(deletedShift);

  // console.log(deletedShift);
  // res.send(typeof deletedShiftId);
  // res.send(deletedShiftId);

  // res.send(req.body.id);
};

// router.get("/staff", async (req, res) => {
//   const users = await prisma.user.findMany();
//   console.log(users);
//   res.send(users);
// });
