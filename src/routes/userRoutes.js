const express = require('express');
const router = express.Router();
const validateUser = require('../middlewares/validateUser');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../controllers/userController.js');

router.get('/', getUsers);
router.post('/', validateUser, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/follow', followUser);
router.delete('/:id/unfollow', unfollowUser);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

module.exports = router;
