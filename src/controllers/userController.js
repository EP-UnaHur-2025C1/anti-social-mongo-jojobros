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
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Solicitud incorrecta' });
    }
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' }); // Usuario eliminado exitosamente (sin contenido)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//Followers
const followUser = async (req, res) => {
  const { id } = req.params; // ID del usuario a seguir
  const { followerId } = req.body; // ID del que sigue

  if (id === followerId) {
    return res.status(400).json({ error: 'No puedes seguirte a vos mismo' });
  }

  try {
    await User.findByIdAndUpdate(followerId, { $addToSet: { following: id } });
    await User.findByIdAndUpdate(id, { $addToSet: { followers: followerId } });

    res.status(200).json({ message: 'Usuario seguido exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al seguir al usuario' });
  }
};

const unfollowUser = async (req, res) => {
  const { id } = req.params; // ID del usuario a dejar de seguir
  const { followerId } = req.body; // ID del que deja de seguir

  try {
    await User.findByIdAndUpdate(followerId, { $pull: { following: id } });
    await User.findByIdAndUpdate(id, { $pull: { followers: followerId } });

    res.status(200).json({ message: 'Usuario dejado de seguir correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al dejar de seguir al usuario' });
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', '_id nickName');

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los seguidores' });
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('following', '_id nickName');

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los seguidos' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};