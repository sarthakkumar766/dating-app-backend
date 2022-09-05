const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cors = require("cors")

//Import config conn
const connectDB = require("./config/dbConn");

//Import Routes

dotenv.config();
const app = express();
const port = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();

app.use(express.json());
// app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Route Middlewares
app.use("/api/user", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
