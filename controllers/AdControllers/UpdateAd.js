const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Ad = require('../../models/Ad');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let ad = await Ad.findById(id);

  if (!ad) return next(new ErrorHandler('This Ad Not Exist!', 404));

  ad = await Ad.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Ad Updated Successfully',
  });
});
