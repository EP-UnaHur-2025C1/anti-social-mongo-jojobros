const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  deleteImageFromPost,
  updateImageInPost
} = require('../controllers/postController');

router.get('/', getPosts);                                  // GET /posts
router.post('/', createPost);                               // POST /posts
router.put('/:id', updatePost);                             // PUT /posts/:id
router.delete('/:id', deletePost);                          // DELETE /posts/:id
router.delete('/:id/images/:imageId', deleteImageFromPost); // DELETE /posts/:id/images/:imageId
router.put('/:id/images/:imageId', updateImageInPost);      // PUT /posts/:id/images/:imageId

module.exports = router;
