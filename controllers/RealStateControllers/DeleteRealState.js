const AsyncHandler = require('../../middleWare/AsyncHandler');
const User = require('../../models/User');
const RealState = require('../../models/RealState');
const ErrorHandler = require('../../middleWare/ErrorHandler');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.user.id);

  let realState = await RealState.findById(id);

  if (!realState)
    return next(new ErrorHandler('This RealState Not Exist!', 404));

  user.realStates.pull(id);

  await user.save();

  realState = await RealState.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'RealState Deleted Successfully',
  });
});
