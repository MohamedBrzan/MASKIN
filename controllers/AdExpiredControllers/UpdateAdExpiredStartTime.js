const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Ad = require('../../models/Ad');
const AdExpireTime = require('../../models/AdExpireTime');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;
  let adExpire = await AdExpireTime.findById(id).populate('ads.ad');

  if (!adExpire) return next(new ErrorHandler('This AdExpire Not Exist', 404));

  // if (adExpire.ads.length) {
  //   for (let i = 0; i < adExpire.ads.length; i++) {
  //     await Ad.deleteMany({
  //       _id: {
  //         $in: adExpire.ads[i].ad._id.toString(),
  //       },
  //     });
  //   }
  // }

  let allAds = await Ad.find({});
  let availableAds = [];

  if (allAds.length === 1 && adExpire.ads.length === 1) {
    if (allAds[0]._id.toString() === adExpire.ads[0].ad._id.toString()) {
      return next();
    } else {
      adExpire.ads.push({ ad: allAds[0]._id });
      await adExpire.save();
    }
  }

  if (allAds.length >= 2 && adExpire.ads.length <= 0) {
    adExpire.ads.push({ ad: allAds[0]._id });
    adExpire.ads.push({ ad: allAds[1]._id });
    await adExpire.save();
  }
  if (allAds.length > 0 && adExpire.ads.length === 1) {
    if (allAds[0]._id.toString() === adExpire.ads[0].ad._id.toString()) {
      return next();
    } else if (allAds[1]._id.toString() === adExpire.ads[0].ad._id.toString()) {
      return next();
    } else {
      adExpire.ads.push({ ad: allAds[0]._id });
      await adExpire.save();
    }
  }
  if (allAds.length === 1 && adExpire.ads.length === 0) {
    adExpire.ads.push({ ad: allAds[0]._id });
    await adExpire.save();
  }

  if (allAds.length === 0 && adExpire.ads.length === 0) {
    next();
  }

  // if (allAds.length === 1) {
  //   adExpire.ads = [];
  //   await adExpire.save();
  //   adExpire.ads.push({ ad: allAds[0]._id });
  //   adExpire.expireDate = expireDate;
  //   await adExpire.save();
  // } else if (allAds.length > 1) {
  //   adExpire.ads = [];
  //   await adExpire.save();
  //   adExpire.ads.push({ ad: allAds[0]._id });
  //   await adExpire.save();
  //   adExpire.ads.push({ ad: allAds[1]._id });
  //   adExpire.expireDate = expireDate;
  //   await adExpire.save();
  // } else if (!allAds.length) {
  //   adExpire.ads = [];
  //   adExpire.expireDate = expireDate;
  //   await adExpire.save();
  // }

  return res.status(200).json({
    success: true,
    adExpire,
  });
});
