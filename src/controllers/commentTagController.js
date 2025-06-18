const CommentTag = require('../models/CommentTag');

// POST /comment-tags
const assignTagToPost = async (req, res) => {
  try {
    const { postId, tagId } = req.body;
    if (!postId || !tagId) {
      return res.status(400).json({ error: 'Faltan campos requeridos: postId y tagId' });
    }

    const newRelation = new CommentTag({ postId, tagId });
    await newRelation.save();

    res.status(201).json(newRelation);
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar el tag' });
  }
};

// DELETE /comment-tags
const removeTagFromPost = async (req, res) => {
  try {
    const { postId, tagId } = req.body;
    const deleted = await CommentTag.findOneAndDelete({ postId, tagId });
    if (!deleted) return res.status(404).json({ error: 'Relación no encontrada' });
    res.status(200).json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la relación' });
  }
};

// GET /comment-tags/post/:postId
const getTagsForPost = async (req, res) => {
  try {
    const tags = await CommentTag.find({ postId: req.params.postId }).populate('tagId');
    if (tags.length === 0) return res.status(204).send();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tags del post' });
  }
};

module.exports = {
  assignTagToPost,
  removeTagFromPost,
  getTagsForPost,
};