const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.userId;
      next();
    });
  };