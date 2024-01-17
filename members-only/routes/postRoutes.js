const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");

router.get("/", isAuth, postController.getPosts);
router.get("/guest", postController.getPostsGuest);
router.post("/new-post", isAuth, postController.newPost);
router.put("/:id/like-unlike-post", isAuth, postController.likeUnlikePost);
router.delete("/:id/delete", isAuth, isAdmin, postController.removePost);

// isAdmin
module.exports = router;
