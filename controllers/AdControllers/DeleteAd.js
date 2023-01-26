const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Ad = require('../../models/Ad');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.find({ ads: id });

  let ad = await Ad.findById(id);

  if (!ad) return next(new ErrorHandler('This Ad Not Exist!', 404));

  user[0].ads.pull(ad._id);

  await user[0].save();

  await Ad.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Ad Deleted Successfully',
  });
});
