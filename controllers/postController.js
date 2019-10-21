const User = require('../models/User');
const Post = require('../models/Post');

const createPost = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  try {
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(400).send({ msg: 'There is no post to be shown' });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).send({ msg: 'There is no post to be shown' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send({ msg: 'There is no post to be shown' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (post.user.toString() !== req.user.id) {
      // console.log(post.user, req.user.id);
      return res
        .status(401)
        .send({ msg: 'You are not authorized to delete this post' });
    }

    await post.remove();
    res.json({ msg: 'Post succesfully deleted' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send({ msg: 'There is no post to be shown' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Posts already liked' });
    }
    console.log(
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    );
    console.log(
      post.likes.filter(like => like.user.toString() === req.user.id)
    );

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      // console.log(post.likes);
      // console.log(post.likes.map(like => like.user.toString()));
      // console.log(removeIndex);
      return res
        .status(400)
        .json({ msg: 'You cant unlike this post if you havent liked it yet' });
    }

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const commentPost = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const post = await Post.findById(req.params.post_id);

  try {
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  // Pull out comments
  const commentFound = post.comments.find(
    comment => comment.id === req.params.comment_id
  );

  if (!commentFound) {
    return res.status(400).json({ msg: 'Comment doesnt exist' });
  }

  if (commentFound.user.toString() !== req.user.id) {
    return res
      .status(401)
      .json({ msg: 'You are unauthorized to delete this comment' });
  }

  const removeIndex = post.comments
    .map(comment => comment.user.toString())
    .indexOf(req.user.id);

  post.comments.splice(removeIndex, 1);
  await post.save();
  res.json(post.comments);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePostById,
  likePost,
  unlikePost,
  commentPost,
  deleteComment
};
