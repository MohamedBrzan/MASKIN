const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = AsyncHandler(async (req, res, next) => {
  const { password, rePassword, userId } = req.body;

  let user = await User.findById(userId).select('+password');

  if (!user)
    return next(new ErrorHandler('This User Not Exist In Our Database!', 404));

  if (password !== rePassword)
    return next(
      new ErrorHandler('Password mismatch! Please enter your password', 400)
    );

  const newHashedPassword = await bcrypt.hash(password, 12);

  user = await User.findByIdAndUpdate(
    userId,
    {
      password: newHashedPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});
