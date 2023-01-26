const AsyncHandler = require('../../../middleWare/AsyncHandler');

module.exports = AsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(200).json({
      success: true,
      // message: 'No User Is LoggedOut',
      message: 'لا يوجد مستخدم مسجل حالياً',
    });
  }
  res.status(200).json({
    success: true,
    // message: 'Yes Is LoggedIn',
    message: 'يوجد مستخدم مسجل بالفعل',
  });
});
