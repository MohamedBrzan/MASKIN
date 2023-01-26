const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdExpiredSchema = new Schema(
  {
    ads: [
      {
        ad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad' },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AdExpired', AdExpiredSchema);
