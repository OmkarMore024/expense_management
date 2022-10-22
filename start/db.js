const mongoose = require("mongoose");
const config = require("config");

async function establishDatabaseConnection() {
  // await mongoose.connect(config.get("Mongo-DB-url"));
  //1. await mongoose.connect(config.get("Mongo-DB-url"));
  // console.log("Connected to MongoDB!");
  //2.
  mongoose
    .connect(config.get("Mongo-DB-url"))
    .then((resolve) =>
      console.log(`connnected succesfully to ${config.get("Mongo-DB-url")}`)
    ) //change it in the config file
    .catch((err) => console.log("can not be connected"));
}

async function closeDatabaseConnection() {
  await mongoose.connection.close();
  console.log("Disconnected from MongoDB!");
}

module.exports = { establishDatabaseConnection, closeDatabaseConnection };
