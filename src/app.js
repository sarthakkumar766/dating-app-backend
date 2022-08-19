const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Import config conn
const connectDB = require("./config/dbConn");

//Import Routes

dotenv.config();
const app = express();
const port = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();

app.use(express.json());

//Route Middlewares
app.use("/api/user", require("./routes/auth"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
