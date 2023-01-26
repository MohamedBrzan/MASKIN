const AsyncHandler = require('../../middleWare/AsyncHandler');
const Ad = require('../../models/Ad');

module.exports = AsyncHandler(async (req, res, next) => {
  const ads = await Ad.find().sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    length: ads.length,
    ads,
  });
});
