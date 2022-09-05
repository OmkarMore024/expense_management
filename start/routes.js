module.exports.getAllRoutes = function (app) {
  app.use("/api/household", require("../routes/household"));
  app.use("/api/users", require("../routes/user"));
  app.use("/api/householdmembers", require("../routes/householdmembers"));
  app.use("/api/expensetypes", require("../routes/expenseType"));
};
