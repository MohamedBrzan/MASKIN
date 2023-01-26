const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const RealState = require('../../models/RealState');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let realState = await RealState.findById(id);

  if (!realState)
    return next(new ErrorHandler(`This RealState Id ${id} Not Exist`, 404));

  realState = await RealState.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'RealState Updated Successfully',
    realState,
  });
});
