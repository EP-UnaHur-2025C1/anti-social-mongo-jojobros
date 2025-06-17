const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
  uploadImage,
} = require('../controllers/postImageController');

router.get('/', getAllImages);
router.post('/', createImage);       
router.put('/:id', updateImage);     
router.delete('/:id', deleteImage);  
router.post('/upload/:postId', upload.single('img'), uploadImage);

module.exports = router;
