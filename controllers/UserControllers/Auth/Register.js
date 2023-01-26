const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const SendToken = require('../../../middleWare/SendToken');
const User = require('../../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { avatar, name, email, password } = req.body;

  let newUser = await User.findOne({ email }).select('+password');

  // if (newUser) return next(new ErrorHandler('User Already Exists', 400));
  if (newUser) return next(new ErrorHandler('هذا المستخدم موجود بالفعل', 400));

  newUser = await User.create({
    avatar,
    name,
    email,
    password,
  });

  SendToken(res, newUser, 201);
});
