const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    console.log("User:", user);
    next();
  });
};

module.exports = {
  authenticateToken,
};
