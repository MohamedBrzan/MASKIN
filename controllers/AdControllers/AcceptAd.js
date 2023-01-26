const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Ad = require('../../models/Ad');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  let ad = await Ad.findById(id);

  if (!ad) return next(new ErrorHandler('Ad not found', 404));

  if (ad && ad.nationalAccess.acceptation === true)
    return next(new ErrorHandler('Ad already accepted', 400));

  ad = await Ad.findByIdAndUpdate(
    id,
    {
      nationalAccess: {
        acceptation: true,
        acceptationDate: Date.now(),
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    ad,
  });
});
