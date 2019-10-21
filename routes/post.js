const express = require('express');
const auth = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPostById,
  deletePostById,
  likePost,
  unlikePost,
  commentPost,
  deleteComment
} = require('../controllers/postController');
const { postValidation } = require('../validator/validator');

const router = new express.Router();

router.post('/', auth, postValidation, createPost);
router.get('/', auth, getPosts);
router.get('/:post_id', auth, getPostById);
router.delete('/:post_id', auth, deletePostById);
router.put('/like/:post_id', auth, likePost);
router.put('/unlike/:post_id', auth, unlikePost);
router.post('/comments/:post_id', auth, postValidation, commentPost);
router.delete('/comments/:post_id/:comment_id', auth, deleteComment);

module.exports = router;
