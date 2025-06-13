const express = require('express');
const router = express.Router();
const filterOldComments = require('../middlewares/filterOldComments');
const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

router.get('/', filterOldComments, getAllComments);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;