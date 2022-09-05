const mongoose = require("mongoose");
const config = require("config");

async function establishDatabaseConnection() {
  // await mongoose.connect(config.get("Mongo-DB-url"));
  await mongoose.connect(config.get("Mongo-DB-url"));
  console.log("Connected to MongoDB!");
}
async function closeDatabaseConnection() {
  await mongoose.connection.close();
  console.log("Disconnected from MongoDB!");
}

module.exports = { establishDatabaseConnection, closeDatabaseConnection };
