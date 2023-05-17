const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CRUD (Create • Read • Update • Delete)

// CREATE
exports.createHoliday = async (req, res) => {
  // Here, we are creating an instance of the data that was sent in the
  // request body, from the client/user-agent (web browser/postman),
  // so that we can allow `prisma` to reference the `request body`, that
  // was sent from the client's browser. We create a JavaScript object,
  // based off of the request body, by assigning keys, values that target
  // the `request body` key's, and their respective values.
  const createdHoliday = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    employee: req.body.employeeId,
  };

  // Here, we create a constant to store the result of `prisma`, creating
  // the real `holiday` SQL database table row/record.
  const holiday = await prisma.holiday.create({
    data: {
      start_date: createdHoliday.startDate,
      end_date: createdHoliday.endDate,
      employeeId: createdHoliday.employee,
    },
  });

  console.log("Created Holiday: ", createdHoliday);
  console.log("Holiday: ", holiday);
  res.send(holiday);
};

// READ
exports.holidays = async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    console.log("Query: ", req.query);

    let approvalStatus;
    let employee = req.query.employee;

    if (req.query.approved === "true") approvalStatus = true;
    else approvalStatus = false;

    if (employee) employee = parseInt(employee);

    const filteredHolidayData = {
      employee: employee,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      approved: approvalStatus,
    };

    console.log("Filtered Holiday Data: ", filteredHolidayData);

    const filteredHolidays = await prisma.holiday.findMany({
      where: {
        employeeId: filteredHolidayData.employee,
        start_date: filteredHolidayData.startDate,
        end_date: filteredHolidayData.endDate,
        approved: filteredHolidayData.approved,
      },
      include: {
        employee: {
          select: {
            username: true,
          },
        },
      },
    });

    res.send(filteredHolidays);
    // res.send(employeeId);
  } else {
    console.log("Returning All Holiday Records");
    const holidays = await prisma.holiday.findMany({
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
    console.log(holidays);
    res.send(holidays);
  }
};

// UPDATE
exports.updateHoliday = async (req, res) => {
  const updatedHoliday = {
    id: req.body.id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    employeeId: req.body.employeeId,
    approved: req.body.approved,
  };

  const holiday = await prisma.holiday.update({
    where: {
      id: req.body.id,
    },
    data: {
      start_date: updatedHoliday.startDate,
      end_date: updatedHoliday.endDate,
      employeeId: updatedHoliday.employeeId,
      approved: updatedHoliday.approved,
    },
  });

  res.send(holiday);
};

// DELETE
exports.deleteHoliday = async (req, res) => {
  const deletedHolidayId = parseInt(req.params.id);
  // const deletedHolidayId = req.body.id;

  const deletedHoliday = await prisma.holiday.delete({
    where: {
      id: deletedHolidayId,
    },
  });
  res.send(deletedHoliday);
};
