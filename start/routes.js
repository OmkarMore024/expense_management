module.exports.getAllRoutes = function (app) {
  app.use("/api/households", require("../routes/household"));
  app.use("/api/users", require("../routes/user"));
  app.use("/api/householdmembers", require("../routes/householdmembers"));
  app.use("/api/expensetypes", require("../routes/expenseType"));
  app.use("/api/householdexpenses", require("../routes/houseHoldexpenses"));
  app.use("/api/periodicpayments", require("../routes/periodicPayment"));
  app.use("/api/login", require("../routes/login"));
};
