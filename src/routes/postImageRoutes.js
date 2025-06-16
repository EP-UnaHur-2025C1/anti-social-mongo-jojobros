const express = require('express');
const router = express.Router();
const {
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
} = require('../controllers/postImageController');

router.get('/', getAllImages);
router.post('/', createImage);       
router.put('/:id', updateImage);     
router.delete('/:id', deleteImage);  

module.exports = router;
