const AsyncHandler = require('./AsyncHandler');
const ErrorHandler = require('./ErrorHandler');
const User = require('../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.isAdmin !== true)
    return next(new ErrorHandler('هذه العملية متاحة للأدمن فقط', 500));

  next();
});
