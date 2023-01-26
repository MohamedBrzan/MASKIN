const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .populate({
      path: 'messages.user',
    })
    .populate('reviews.user')
    .populate('realStates blogs');

  if (!user) return next(new ErrorHandler('This User Not Found', 404));

  res.status(200).json({
    success: true,
    user,
  });
});
