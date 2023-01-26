const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const User = require('../../models/User');
const RealState = require('../../models/RealState');

module.exports = AsyncHandler(async (req, res, next) => {
  const { userId, realStateId, message } = req.body;

  // if (id === req.user.id)
  //   return next(new ErrorHandler(`You Can't Send Message To Yourself`, 500));

  const user = await User.findById(userId);

  // if (!user) return next(new ErrorHandler(`User Not Found`, 404));
  if (!user)
    return next(
      new ErrorHandler(`هذا المستخدم غير موجود فى قاعدة البيانات`, 404)
    );

  const realState = await RealState.findById(realStateId);

  // if (!realState) return next(new ErrorHandler(`RealState Not Found`, 404));
  if (!realState)
    return next(
      new ErrorHandler(`هذا العقار غير موجود فى قاعدة البيانات`, 404)
    );

  if (userId === req.user.id)
    return next(new ErrorHandler(`لا يمكن إرسال رسالة لنفس الشخص المرسل`, 500));

  const callerUser = await User.findById(req.user.id);
  const userToCall = await User.findById(userId);

  userToCall.messages.push({
    user: callerUser,
    message,
    realState: realStateId,
  });

  await userToCall.save();

  res.status(200).json({
    success: true,
    message: 'Message Sent Successfully',
  });
});
