const AsyncHandler = require('../../../middleWare/AsyncHandler');

module.exports = AsyncHandler(async (req, res, next) => {
  res.status(200).cookie('token', '').json({
    success: true,
    message: 'تم تسجيل الخروج بنجاح',
  });
});
