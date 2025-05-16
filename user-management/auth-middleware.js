const jwt = require("jsonwebtoken");

const errorCard = (code, message, err) => {
  return {
    response_code: code,
    response_message: message,
    error: err,
  };
};

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res
    .status(401)
    .json(errorCard(401, "Unauthenticated", "No token provided"));

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      "bci-fixed-asset-management"
    );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json(errorCard(401, "Cannot access", "Invalid token"));
  }
}

module.exports = verifyToken;
