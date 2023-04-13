const jwt = require("jsonwebtoken");
require("dotenv").config();

// const verifyToken = (req, res, next) => {
//   const token = req.body.token;

//   if (!token) {
//     return res.status(403).send("A token is required for authentication!");
//   }

//   try {
//     const decoded = jwt.verify(token, "secret");
//     req.employee = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// module.exports = verifyToken;

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
//     console.log(err)

//     if (err) return res.sendStatus(403)

//     req.user = user

//     next()
//   })
// }

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, employee) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.employee = employee;

    next();
  });
};

module.exports = authenticateToken;

// ======================================================================

// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// module.exports = verifyToken;
