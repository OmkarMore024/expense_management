const { appendFile } = require("fs");

function getPort(app) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Connected to port : ${PORT}`);
  });
}

module.exports = { getPort };
