const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const RealState = require('../../models/RealState');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const realState = await RealState.findById(id).populate('owner');

  if (!realState)
    return next(new ErrorHandler('This RealState Not Exist', 404));

  return res.status(200).json({
    success: true,
    realState,
  });
});
