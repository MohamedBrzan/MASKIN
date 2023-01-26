const AsyncHandler = require('./AsyncHandler');
const ErrorHandler = require('./ErrorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(
      new ErrorHandler('من فضلك قم بتسجيل الدخول أولاً', 400)
    );
  // if (!token) return next(new ErrorHandler('Please Login First', 400));

  const decoded = jwt.verify(token, `${process.env.JWT_SECRET_TOKEN}`);

  req.user = await User.findById(decoded.id);

  next();
});
