const PostImage = require('../models/PostImage');
const Post = require('../models/Post');

// GET /images
const getAllImages = async (req, res) => {
  try {
    const images = await PostImage.find().populate('postId');
    if (images.length === 0) return res.status(204).send();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST /images
const createImage = async (req, res) => {
  try {
    const { img, postId } = req.body;
    if (!img || !postId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: "img" y "postId"' });
    }

    const newImage = new PostImage({ img, postId });
    await newImage.save();  

    // 🔧 Agregamos la imagen al array del Post
    await Post.findByIdAndUpdate(postId, {
      $push: { imagenes: newImage._id }
    });    

    res.status(201).json(newImage);
  }catch (error) {
  console.error('Detalles del error:', error.message);
  return res.status(500).json({ error: 'Error al crear la imagen', detalle: error.message });
} 
};

// PUT /images/:id
const updateImage = async (req, res) => {
  try {
    const updated = await PostImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Imagen no encontrada' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Solicitud incorrecta' });
  }
};

// DELETE /images/:id
const deleteImage = async (req, res) => {
  try {
    const deleted = await PostImage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Imagen no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  getAllImages,
  createImage,
  updateImage,
  deleteImage
};
