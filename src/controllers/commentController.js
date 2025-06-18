const Comment = require('../models/Comment');

// GET /comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('userId', 'nickName').populate('postId');

    if (comments.length === 0) return res.status(204).send();

    const filtered = res.filterOldComments(comments);
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST /comments
const createComment = async (req, res) => {
  try {
    const { postId, userId, comment, fecha } = req.body;
    if (!postId || !userId || !comment) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: postId, userId y comment' });
    }

    const newComment = new Comment({ postId, userId, comment, fecha });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

// PUT /comments/:id
const updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Solicitud incorrecta' });
  }
};

// DELETE /comments/:id
const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};