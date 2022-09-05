const express = require("express");
// require("express-async-errors");
const app = express();

//requiring the database methods from start/db file
const {
  establishDatabaseConnection,
  closeDatabaseConnection,
} = require("./start/db");
// requiring the PORT number from the start/port file
const { getPort } = require("./start/port");

app.use(express.json());

//established the database connection to MongoDB
establishDatabaseConnection();

// getting all routes defined in start/routes file
// getAllRoutes(app);
app.get("/", (req, res) => {
  req.status(200).send("Running ");
});

app.use("/api/household", require("./routes/household"));
app.use("/api/users", require("./routes/user"));
// PORT number to listen to
getPort(app);
