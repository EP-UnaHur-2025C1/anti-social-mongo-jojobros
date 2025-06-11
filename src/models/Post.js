const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    imagenes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostImage',
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
