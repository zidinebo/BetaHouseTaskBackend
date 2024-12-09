require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const authRouter = require("./routes/authRouter");

const betaHouseRouter = require("./routes/betaHouseRouter");

const bookMarkRouter = require("./routes/bookmarkRouter");
const error = require("./middlewares/error");

const app = express();

const port = 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.send();
});

app.use("/api/auth", authRouter);

app.use("/api/betahouse", betaHouseRouter);

app.use("/api/bookmark", bookMarkRouter);

// ====== CUSTOM MIDDLEWARE FOR ERRORS =========
app.use(error);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
    await app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

start();

//  Gm848JfgqwCWbFDU
// mongodb+srv://zidinebo:Gm848JfgqwCWbFDU@cluster0.rnmam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
