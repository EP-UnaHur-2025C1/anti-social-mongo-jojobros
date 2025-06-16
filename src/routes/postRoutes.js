const express = require('express');
const router = express.Router();
const validatePost = require('../middlewares/validatePost');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  deleteImageFromPost,
  updateImageInPost
} = require('../controllers/postController');

router.get('/', getPosts);
router.post('/', validatePost, createPost);                 
router.put('/:id', updatePost);                             
router.delete('/:id', deletePost);                          
router.delete('/:id/images/:imageId', deleteImageFromPost); 
router.put('/:id/images/:imageId', updateImageInPost);      

module.exports = router;
