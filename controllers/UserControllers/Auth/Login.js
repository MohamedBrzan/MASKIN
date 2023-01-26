const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const SendToken = require('../../../middleWare/SendToken');
const User = require('../../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select('+password');

  // if (!user)
  //   return next(
  //     new ErrorHandler('Wrong Email Or Password Please Try Again Later.', 400)
  //   );
  if (!user)
    return next(
      new ErrorHandler(
        'خطأ فى الإيميل أو الرقم السرى حاول مرة أخرى لاحقاً',
        400
      )
    );

  const isMatch = await user.isValidPassword(password);

  // if (!isMatch)
  //   return next(
  //     new ErrorHandler('Wrong Email Or Password Please Try Again Later.', 400)
  //   );

  if (isMatch || password === user.password) {
    SendToken(res, user, 201);
  } else if (!isMatch)
    return next(
      new ErrorHandler(
        'خطأ فى الإيميل أو الرقم السرى حاول مرة أخرى لاحقاً',
        400
      )
    );
});
