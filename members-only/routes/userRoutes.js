const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/authMiddleware");

router.get("/", userController.getAllUsers);
router.get("/admins", isAuth, isAdmin, userController.getAdmins);
router.get("/:id", userController.getUser);
router.put("/verify", isAuth, userController.verifyUser);
router.put("/:id/make-admin", isAuth, isAdmin, userController.makeAdmin);

module.exports = router;
// 65a7d0ed6b8b4fd6a2f25917
