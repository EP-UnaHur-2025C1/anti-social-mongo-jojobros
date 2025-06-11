const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);