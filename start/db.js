const mongoose = require("mongoose");

async function establishDatabaseConnection() {
  await mongoose.connect("mongodb://localhost:27017/expense_management");
  console.log("Connected to MongoDB!");
}
async function closeDatabaseConnection() {
  await mongoose.connection.close();
  console.log("Disconnected from MongoDB!");
}

module.exports = { establishDatabaseConnection, closeDatabaseConnection };
