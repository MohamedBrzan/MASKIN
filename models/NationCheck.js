const mongoose = require('mongoose');
const { Schema } = mongoose;

const nationCheckSchema = new Schema(
  {
    ad: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('NationCheck', nationCheckSchema);
