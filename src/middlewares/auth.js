const jwt = require("jsonwebtoken");

export function validateToken(req, res, next) {
  const headers = req.headers["authorization"];
  if (headers) {
    req.token = headers.split(" ")[1];
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
      if (error) {
        return res.status(500).json({
          message: "Error, invalid token",
        });
      }
      next();
    });
  } else {
    return res.status(403).json({
      message: "Error, invalid token",
    });
  }
}
