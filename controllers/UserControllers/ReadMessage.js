const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const User = require('../../models/User');
const RealState = require('../../models/RealState');

module.exports = AsyncHandler(async (req, res, next) => {
  const { messageId } = req.body;

  const user = await User.findById(req.user.id);

  // if (!user) return next(new ErrorHandler(`User Not Found`, 404));
  if (!user)
    return next(
      new ErrorHandler(`هذا المستخدم غير موجود فى قاعدة البيانات`, 404)
    );

  const message = user.messages.id(messageId);

  if (!message)
    return next(
      new ErrorHandler('هذه الرسالة غير موجودة فى قاعدة البيانات', 404)
    );

  message.isRead = true;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Message Read Successfully',
  });
});
