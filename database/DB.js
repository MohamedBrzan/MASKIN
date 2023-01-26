const mongoose = require('mongoose');

module.exports = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected 💚💚💚'))
    .catch((err) => console.log(err + '💔💔💔'));
