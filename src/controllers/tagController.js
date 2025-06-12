const Tag = require('../models/Tag');

// GET /tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    if (tags.length === 0) return res.status(204).send();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST /tags
const createTag = async (req, res) => {
  try {
    const { tag } = req.body;
    if (!tag) return res.status(400).json({ error: 'Campo "tag" obligatorio' });

    const newTag = new Tag({ tag });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la etiqueta' });
  }
};

// PUT /tags/:id
const updateTag = async (req, res) => {
  try {
    const updated = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Solicitud incorrecta' });
  }
};

// DELETE /tags/:id
const deleteTag = async (req, res) => {
  try {
    const deleted = await Tag.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
};