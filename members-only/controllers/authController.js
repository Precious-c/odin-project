const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/UserModel");

const authController = {
  register: async (req, res, next) => {
    // const errors = validationResult(req)
    // console.log(!errors.isEmpty())
    // if(!validationResult(req)) {
    //     console.log(validationResult(req))
    //     const errorMessages = errors.errors.map(error => error.msg)
    //     console.log(errorMessages)
    //     req.flash("errors", errorMessages)
    //     res.redirect("/register")
    // }

    const validationErrors = [];
    if (validator.isEmpty(req.body.fullName))
      validationErrors.push({ msg: "Name cannot be empty" });
    if (validator.isEmpty(req.body.userName))
      validationErrors.push({ msg: "Username cannot be empty" });
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 6 }))
      validationErrors.push({
        msg: "Password must be at least 6 characters long",
      });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });
    if (validationErrors.length) {
      return res.status(400).json({ success: false, msg: validationErrors });
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    try {
      //Password hashing
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      //Create new user model
      const user = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        membershipStatus: "unverified",
        isAdmin: false,
        posts: [],
      });

      // Checking for Existing User
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { userName: req.username }],
      });

      // If an existing user is found
      if (existingUser)
        return res
          .status(400)
          .json({ success: false, msg: "User with the same email or username already exists" });

      await user.save();
      console.log("User saved successfully.");
      return res.status(201).json({ success: true, user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(404).json({ success: false, msg: "User not found" });
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(401).json({ success: false, msg: "Wrong credentials" });

      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
      console.log(`${user.userName} logged in`);
      const { password: pass, ...userData } = user._doc;
      return res.status(200).json({ success: true, user: userData, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, msg: err.message });
    }
  },
};

module.exports = authController;
