import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 }) // sort it in ascending order.
      .limit(LIMIT) //  select atmost limit no of posts.
      .skip(startIndex); //   skip startIndex no of posts.

    res.status(200).json({
      posts: posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  //console.log(searchQuery + " " + tags);

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  return res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(400).json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    return res.status(202).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const post = await PostMessage.findById(id);

    post.comments.push(comment);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};
