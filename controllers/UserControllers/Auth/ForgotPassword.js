const User = require('../../../models/User');
const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const sendEmail = require('../../../middleWare/SendMail');

module.exports = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler('هذا الأيميل غير مسجل', 404));
  // if (!user)
  //   return next(new ErrorHandler('This User Not Exist In Our Database!', 404));

  const token = user.generateToken();

  const url = `http://localhost:3000/reset-password/${user._id}/${token}`;

  sendEmail(email, url);

  return res.status(200).json({
    success: true,
  });
});
