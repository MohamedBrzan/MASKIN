const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Ad = require('../../models/Ad');
const AdExpireTime = require('../../models/AdExpireTime');

module.exports = AsyncHandler(async (req, res, next) => {
  const { start, end } = req.body;
  let adExpire = await AdExpireTime.create({ start, end });

  return res.status(200).json({
    success: true,
    adExpire,
  });
});
