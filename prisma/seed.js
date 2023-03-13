const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const admin1 = await prisma.employee.upsert({
    where: { email: "admin1@email.com" },
    update: {},
    create: {
      email: "admin1@email.com",
      username: "admin1",
      password: "employee",
      admin: false,
      shifts: {
        create: [
          {
            date: "2023-05-01",
            duration: "8h",
            start_time: "09:00",
            finish_time: "17:00",
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const employee1 = await prisma.user.upsert({
//   where: { email: "employee1@email.com" },
//   update: {},
//   create: {
//     email: "employee1@email.com",
//     username: "employee1",
//     password: "employee",
//     admin: true,
//   },
// });

// const employee2 = await prisma.user.upsert({
//   where: { email: "employee2@email.com" },
//   update: {},
//   create: {
//     email: "employee2@email.com",
//     username: "employee2",
//     password: "employee",
//     admin: false,
//   },
// });

// const employee3 = await prisma.user.upsert({
//   where: { email: "employee3@email.com" },
//   update: {},
//   create: {
//     email: "employee3@email.com",
//     username: "employee3",
//     password: "employee",
//     admin: false,
//   },
// });

// const employee4 = await prisma.user.upsert({
//   where: { email: "employee4@email.com" },
//   update: {},
//   create: {
//     email: "employee4@email.com",
//     username: "employee4",
//     password: "employee",
//     admin: false,
//     shifts: {
//       create: {
//         date: "2023-05-01",
//         duration: "8h",
//         start_time: "09:00",
//         finish_time: "17:00",
//         employee: 1,
//       },
//     },
//   },
// });

// const allUsers = [admin1, employee1, employee2, employee3, employee4];

// const shift1 = await prisma.shift.upsert({
//   where: { id: 1 },
//   update: {},
//   create: {
//     date: "2023-05-01",
//     duration: "8h",
//     start_time: "09:00",
//     finish_time: "17:00",
//     employee: 1,
//   },
// });

// const shift2 = await prisma.shift.upsert({
//   where: { id: 2 },
//   update: {},
//   create: {
//     date: "2023-05-01",
//     duration: "8h",
//     start_time: "09:00",
//     finish_time: "17:00",
//     employee: 2,
//   },
// });

// const shift3 = await prisma.shift.upsert({
//   where: { id: 3 },
//   update: {},
//   create: {
//     date: "2023-05-01",
//     duration: "8h",
//     start_time: "09:00",
//     finish_time: "17:00",
//     employee: 3,
//   },
// });

// const shift4 = await prisma.shift.upsert({
//   where: { id: 4 },
//   update: {},
//   create: {
//     date: "2023-05-01",
//     duration: "8h",
//     start_time: "09:00",
//     finish_time: "17:00",
//     employee: 4,
//   },
// });

// const shift5 = await prisma.shift.upsert({
//   where: { id: 5 },
//   update: {},
//   create: {
//     date: "2023-05-01",
//     duration: "8h",
//     start_time: "09:00",
//     finish_time: "17:00",
//     employee: 5,
//   },
// });

// const allShifts = [shift1, shift2, shift3, shift4, shift5];

// console.log(allUsers);

// console.log(allShifts);

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()

// async function main() {
//   const alice = await prisma.user.upsert({
//     where: { email: 'alice@prisma.io' },
//     update: {},
//     create: {
//       email: 'alice@prisma.io',
//       name: 'Alice',
//       posts: {
//         create: {
//           title: 'Check out Prisma with Next.js',
//           content: 'https://www.prisma.io/nextjs',
//           published: true,
//         },
//       },
//     },
//   })

//   const bob = await prisma.user.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   })
//   console.log({ alice, bob })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
