const mongoose = require("mongoose");
const Post = require("../models/postModel");

const getAllPosts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const posts = await Post.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Post not found" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const user_id = req.user._id;
    const post = await Post.create({ title, reps, load, user_id });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Post not found" });
  }

  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Post not found" });
  }

  const post = await Post.findById(id);

  if (req.user._id.toString() !== post.user_id) {
    return res.status(401).json({ error: "User not authorized" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!updatedPost) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(updatedPost);
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
};
