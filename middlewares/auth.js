const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(customError("No Token Provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payLoad);
    req.user = { userId: payLoad.userId };
    console.log(req.user);

    next();
  } catch (error) {
    return next(customError("Unathorized", 401));
  }
};

module.exports = auth;
