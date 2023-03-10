const express = require("express");
const app = express();
const port = 8080;

const routes = require("./routes/routes");

// app.get("/", (req, res) => {
//   res.send("<h2>Welcome to Workable!</h2>");
// });

// app.get("/login", (req, res) => {
//   res.send("<h2>Login</h2>");
// });

app.use("/", routes);

app.listen(port, () => {
  console.log(
    `Welcome to Workable API. Visit https://fyeek4-${port}.preview.csb.app/`
  );
});

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
