const Post = require("../models/PostModel");
const mongoose = require("mongoose");
const validator = require("validator");

const postController = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      if (!posts) res.status(404).json({ success: false, msg: "No posts found" });
      if (!req.user) {
        posts.map((post) => {
          delete post.postedBy;
        });
      }
      res.status(200).json({ success: true, posts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, msg: err.message });
    }
  },
  newPost: async (req, res) => {
    try {
      if (req.user.membershipStatus !== "verified")
        return res.status(401).json({ success: false, msg: "User is not verified" });
      const { title, postBody } = req.body;
      if (validator.isEmpty(title) || validator.isEmpty(postBody))
        return res.status(400).json({ success: false, msg: "Post cannot be empty" });
      const post = new Post({
        title,
        postBody,
        postedBy: req.user,
        likes: [],
      });
      await post.save();
      return res.status(200).json({ success: true, post });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  likeUnlikePost: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ success: false, msg: "Post not found" });
      post.likes.includes(userId)
        ? (post = post.likes.filter((id) => id !== userId))
        : post.likes.push(userId);
      return res.status(200).json({ success: true, post });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },

  //DESC: delete a post
  removePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ success: false, msg: "Post not found" });
      if (post.postedBy.id !== req.user.id)
        return res.status(400).json({ success: false, msg: "Unauthorized" });
      const result = await Post.findOneAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: true, msg: err.message });
    }
  },
};
module.exports = postController;
