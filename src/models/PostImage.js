const mongoose = require('mongoose');

const postImageSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PostImage', postImageSchema);
