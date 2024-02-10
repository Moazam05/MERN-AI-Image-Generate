const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Post name is required"],
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
