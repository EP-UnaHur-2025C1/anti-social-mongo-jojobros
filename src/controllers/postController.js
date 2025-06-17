const Post = require('../models/Post');
const PostImage = require('../models/PostImage');
const redisClient = require('../config/redisClient');


// GET /posts
const getPosts = async (req, res) => {
  try {
    // Verificar si hay cache
    const cached = await redisClient.get('posts_cache');
    if (cached) {
      console.log('Devuelto desde Redis');
      return res.status(200).json(JSON.parse(cached));
    }

    // Si no hay cache, consultar Mongo
    const posts = await Post.find()
      .populate('imagenes', 'img')
      .populate('userId', 'nickName');

    if (!posts || posts.length === 0) return res.status(204).send();

    // Guardar en Redis por 180 segundos
    await redisClient.set('posts_cache', JSON.stringify(posts), { EX: 180 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST /posts
const createPost = async (req, res) => {
  try {
    const { userId, content, fecha, imagenes } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ error: 'Los campos "userId" y "content" son obligatorios' });
    }

    const post = new Post({ userId, content, fecha });
    await post.save();

    if (Array.isArray(imagenes) && imagenes.length > 0) {
      const nuevasImagenes = await PostImage.insertMany(
        imagenes.map(img => ({
          img: img.img,
          postId: post._id
        }))
      );
      post.imagenes = nuevasImagenes.map(img => img._id);
      await post.save();
    }

    res.status(201).json(post); // Publicación creada exitosamente
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
};

// PUT /posts/:id
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.status(201).json(post); // Publicación actualizada exitosamente
  } catch (error) {
    res.status(400).json({ error: 'Solicitud incorrecta' });
  }
};

// DELETE /posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });

    await PostImage.deleteMany({ postId: post._id }); // Eliminar imágenes asociadas
    await post.deleteOne(); // Eliminar post

    res.status(200).json({ message: 'Publicación eliminada exitosamente junto con todos sus recursos asociados' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// DELETE /posts/:id/images/:imageId
const deleteImageFromPost = async (req, res) => {
  try {
    const image = await PostImage.findByIdAndDelete(req.params.imageId);
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });

    await Post.findByIdAndUpdate(image.postId, {
      $pull: { imagenes: image._id }
    });

    res.status(200).json({ message: 'Imagen eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
};

// PUT /posts/:id/images/:imageId
const updateImageInPost = async (req, res) => {
  try {
    const image = await PostImage.findByIdAndUpdate(req.params.imageId, req.body, {
      new: true,
      runValidators: true
    });
    if (!image) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.status(200).json({ message: 'Publicación actualizada exitosamente', image });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  deleteImageFromPost,
  updateImageInPost
};
