const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createHoliday = async (req, res) => {
  const createdHoliday = {
    username: req.body.employee.username,
    startDate: req.body.start_date,
    endDate: req.body.end_date,
    employeeId: req.body.employeeId,
  };

  const holiday = await prisma.shift.create({
    include: {
      shift: {
        select: {
          employeeId: {
            where: {
              username: createdShift.username,
            },
          },
        },
      },
    },

    // include: {
    //   shift: {
    //     select: {
    //       emplo
    //     where: {
    //       username: createdShift.username,
    //     },
    //     },
    //   },
    // },

    data: {
      date: createdHoliday.date,
      start_time: createdHoliday.start_time,
      finish_time: createdHoliday.finish_time,
      duration: createdHoliday.duration,
      // employeeId: createdShift.employeeId,
    },
  });

  console.log("Created Shift: ", createdShift);
  res.send(req.body);
};
