const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    postBody: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
