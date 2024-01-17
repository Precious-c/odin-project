const Post = require("../models/PostModel");
const mongoose = require("mongoose");
const validator = require("validator");

const postController = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      if (!posts || posts.length === 0)
        res.status(404).json({ success: false, msg: "No posts found" });
      return res.status(200).json({ success: true, posts });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  getPostsGuest: async (req, res) => {
    try {
      const posts = await Post.find();
      if (!posts || posts.length === 0)
        res.status(404).json({ success: false, msg: "No posts found" });
      const modifiedPosts = posts.map((post) => {
        const modifiedPost = post.toObject();
        delete modifiedPost.postedBy;
        return modifiedPost;
      });
      return res.status(200).json({ success: true, posts: modifiedPosts });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  newPost: async (req, res) => {
    try {
      if (req.user.user.membershipStatus !== "verified")
        return res.status(401).json({ success: false, msg: "User is not verified" });
      const { title, postBody } = req.body;
      if (validator.isEmpty(title) || validator.isEmpty(postBody))
        return res.status(400).json({ success: false, msg: "Post cannot be empty" });
      const post = new Post({
        title,
        postBody,
        postedBy: req.user.user,
        likes: [],
      });
      await post.save();
      return res.status(200).json({ success: true, post });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  //DESC: toggles the like status of a post
  likeUnlikePost: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.user._id;
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ success: false, msg: "Post not found" });
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((currentId) => currentId !== userId);
      } else {
        post.likes.push(userId);
      }
      await post.save();
      console.log(post.likes);
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
      const post = await Post.findById({ _id: id });
      console.log(post);
      if (!post) return res.status(404).json({ success: false, msg: "Post not found" });
      console.log(req.user.user._id);
      const postedBy = post.postedBy.toString();
      if (postedBy !== req.user.user._id)
        return res
          .status(400)
          .json({ success: false, msg: "Unauthorized: user is not the owner of post" });
      const result = await Post.findOneAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: true, msg: err.message });
    }
  },
};
module.exports = postController;
