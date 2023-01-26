const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const RealState = require('../../../models/RealState');
const User = require('../../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const realState = await RealState.findById(id);

  const user = await User.findById(req.user.id);

  if (!realState)
    return next(new ErrorHandler('This RealState Not Exist!', 404));

  const findRealStateInUserFavorites = user.realStateFavorites.find(
    (realState) => realState._id.toString() === id
  );

  if (findRealStateInUserFavorites) {
    user.realStateFavorites.pull(realState._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'RealState Removed Successfully From Your Favorites',
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'This RealState Not Exist! In Your Favorites',
    });
  }
});
