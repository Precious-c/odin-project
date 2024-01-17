const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const reqHeader = req.headers.authorization;
  if (!reqHeader)
    return res.status(401).json({ success: false, msg: "Unauthorized: user not authenticated" });
  const token = reqHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded token", decoded);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, msg: `Unauthorized: ${err.message}` });
  }
}

module.exports = verifyToken;
