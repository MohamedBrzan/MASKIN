const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Ad = require('../../models/Ad');
const AdExpireTime = require('../../models/AdExpireTime');

module.exports = AsyncHandler(async (req, res, next) => {
  let adExpire = await AdExpireTime.find({}).populate('ads.ad');

  return res.status(200).json({
    success: true,
    adExpire,
  });
});
