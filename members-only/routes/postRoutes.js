const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);
router.post("/new-post", isAuth, postController.newPost);
router.put("/:id/likeUnlikePost", isAuth, postController.likeUnlikePost);
router.delete("/:id/delete", isAuth, postController.removePost);

// isAdmin
module.exports = router;
