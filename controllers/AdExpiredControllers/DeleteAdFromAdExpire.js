const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Ad = require('../../models/Ad');
const AdExpireTime = require('../../models/AdExpireTime');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { ownerId, adId, adExpireId } = req.body;

  const owner = await User.findById(ownerId);

  if (!owner) return next(new ErrorHandler('This Owner Not Exist', 404));

  let ad = await Ad.findById(adId);

  if (!ad) return next(new ErrorHandler('This Ad Not Exist!', 404));

  owner.ads.pull(ad._id);

  await owner.save();

  await Ad.findByIdAndDelete(adId);
  await AdExpireTime.findByIdAndUpdate(
    adExpireId,
    {
      $pull: {
        ads: { ad: adId },
      },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Ad Deleted Successfully',
  });
});
