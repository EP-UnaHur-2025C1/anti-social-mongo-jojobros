const express = require('express');
const router = express.Router();
const validateUser = require('../middlewares/validateUser');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController.js');

router.get('/', getUsers);
router.post('/', validateUser, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
