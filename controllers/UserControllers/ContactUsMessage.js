const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { message } = req.body;

  const user = await User.findById(req.user.id);

  let admins = await User.find({ isAdmin: true });

  const findAdminId = admins.find(
    (admin) => admin._id.toString() === req.user.id
  );

  if (findAdminId)
    return next(
      new ErrorHandler('أنت أدمن بالفعل لا يمكن إرسال رسالة لنفس الشخص', 500)
    );

  admins.forEach(async (admin) => {
    admin.clientsMessages.push({ user, message });
    await admin.save();
  });

  // res.status(200).json({
  //   success: true,
  //   message: 'Message Sent Successfully',
  // });
  res.status(200).json({
    success: true,
    message:
      'تم إرسال الرسالة بنجاح سيقوم أحد ممثلى الدعم الفنى بالرد عليك قريباً',
  });
});
