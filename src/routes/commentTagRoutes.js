const express = require('express');
const router = express.Router();
const {
  assignTagToPost,
  removeTagFromPost,
  getTagsForPost
} = require('../controllers/commentTagController');

router.post('/', assignTagToPost);
router.delete('/', removeTagFromPost);
router.get('/post/:postId', getTagsForPost);

module.exports = router;