const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_PASSWORD}:${process.env.DB_PASSWORD}@nam.qvmcxge.mongodb.net/`,
    );
    console.log(`connected to db successfully`);
  } catch (error) {
    console.log(error);
    console.log(`cannot connect to db`);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", authRouter);
app.use("/", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));