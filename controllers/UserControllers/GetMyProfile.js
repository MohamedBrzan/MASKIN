const AsyncHandler = require('../../middleWare/AsyncHandler');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate('realStateFavorites')
    .populate('blogFavorites');

  res.status(200).json({
    success: true,
    user,
  });
});
