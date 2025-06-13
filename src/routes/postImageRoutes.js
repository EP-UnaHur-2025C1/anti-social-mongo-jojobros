const express = require('express');
const router = express.Router();
const {
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
} = require('../controllers/postImageController');

router.get('/', getAllImages);       // GET /images
router.post('/', createImage);       // POST /images
router.put('/:id', updateImage);     // PUT /images/:id
router.delete('/:id', deleteImage);  // DELETE /images/:id

module.exports = router;
