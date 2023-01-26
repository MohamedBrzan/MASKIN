const AsyncHandler = require('../../middleWare/AsyncHandler');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'reviews.user',
  });

  res.status(200).json({
    success: true,
    reviews: user.reviews.reverse((a, b) => b.createdAt - a.createdAt),
  });
});
