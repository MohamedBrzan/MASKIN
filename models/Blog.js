const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },

    title: {
      type: String,
      maxLength: [100, 'Title Should Be Less Than 100 Characters'],
      trim: true,
      require: true,
    },

    content: {
      type: String,
      trim: true,
      require: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String,
        require: true,
      },
    ],

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        ratingNum: {
          type: Number,
          require: true,
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],

    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    tags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);
