const express = require("express");

const app = express();
const port = 9000;
const mongoDB = require("./db");
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
