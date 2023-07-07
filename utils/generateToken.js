const jwt = require("jsonwebtoken");

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.KEY, { expiresIn: "30m" });

module.exports = generateToken;
