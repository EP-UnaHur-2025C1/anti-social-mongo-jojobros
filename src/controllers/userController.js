const User = require('../models/User');

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(204).send(); // No hay contenido
    }
    res.status(200).json(users); // Lista de usuarios
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const { nickName, email } = req.body;
    const newUser = new User({ nickName, email });
    await newUser.save();
    res.status(201).json(newUser); // Usuario creado exitosamente
  } catch (error) {
    res.status(400).json({ error: 'Solicitud incorrecta' }); // Error de validación, etc.
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(201).json(updated); // Usuario actualizado exitosamente
  } catch (error) {
    res.status(400).json({ error: 'Solicitud incorrecta' });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).send(); // Usuario eliminado exitosamente (sin contenido)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};