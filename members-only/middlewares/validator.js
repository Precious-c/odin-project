const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  body("fullname", "Name cannot be empty").not().isEmpty().escape(),
  body("username", "Username cannot empty").not().isEmpty().escape(),
  body("email", "Invalid Email").isEmail(),
  body("password", "Password should be more than 6 characters").isLength({ min: 6 }),
  body("confirmPassword").custom(async (value, { req }) => {
    if (!req.body.password === value) throw new Error("Passwords do not match");
  }),
];
