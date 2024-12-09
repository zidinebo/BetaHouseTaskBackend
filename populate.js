require("dotenv").config();

const mongoose = require("mongoose");

const House = require("./models/betahouses");

const houseJson = require("./houses.json");

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
    console.log("Deleting...");

    await House.deleteMany();
    console.log("Previous houses deleted");
    console.log("Uploading...");

    await House.create(houseJson);
    console.log("House Uploaded Successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
    process.exit(1);
  }
};

start();
