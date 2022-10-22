const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied for auth");

  //add jwtPrivetKey to the config file 
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    // console.log(decoded);
    // console.log("checking middleware-authientication");
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(400).send("--invalid token value");
  }
};
