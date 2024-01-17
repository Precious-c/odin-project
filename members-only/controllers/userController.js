const User = require("../models/UserModel");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (!users) return res.status(404).json({ success: false, msg: "No users found" });
      return res.status(200).json({ success: false, users, noOfUsers: users.length });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ success: false, msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const user = await User.findOne({ _id: id });
      console.log(user);
      if (!user) return res.status(404).json({ success: false, msg: "User not found" });
      return res.status(200).json({ success: true, user });
    } catch (err) {
      return res.status(404).json({ success: false, msg: err.message });
    }
  },
  getAdmins: async (req, res) => {
    try {
      const admins = await User.find({ isAdmin: true });
      return res.status(200).json({ success: true, admins });
    } catch (err) {
      404;
      console.log(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { verificationToken } = req.body;
      const userId = req.user.user._id;
      if (verificationToken !== process.env.USER_VERIFICATION_KEY)
        return res.status(401).json({ success: false, msg: "Incorrect verification code" });
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          membershipStatus: "verified",
        },
        { new: true }
      );
      return res.status(200).json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, msg: err.message });
    }
  },
  makeAdmin: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(req.user);
      console.log(id);
      if (!req.user.user.isAdmin)
        return res.status(401).json({ success: false, msg: `Unauthorized: You are not an admin.` });
      const user = await User.findOne({ _id: id });
      delete user.password;
      if (user.isAdmin)
        return res.status(400).json({ success: false, msg: "User is already an admin", user });
      user.isAdmin = true;
      await user.save();
      return res.status(200).json({ success: true, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
};

module.exports = userController;
