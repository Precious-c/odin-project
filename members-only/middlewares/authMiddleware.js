const isAdmin = (req, res, next) => {
  try {
    const user = req.user.user;
    user && user.isAdmin
      ? next()
      : res.status(403).json({ success: false, msg: "Access forbidden. Admins only" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { isAdmin };
