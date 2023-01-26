const AsyncHandler = require('../../../middleWare/AsyncHandler');
const User = require('../../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('realStateFavorites');

  return res.status(200).json({
    success: true,
    length: user.realStateFavorites.length,
    favorites: user.realStateFavorites,
  });
});
