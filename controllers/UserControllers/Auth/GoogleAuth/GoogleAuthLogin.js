const { OAuth2Client } = require('google-auth-library');
const User = require('../../../../models/User');
const AsyncHandler = require('../../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../../middleWare/ErrorHandler');

const Client = new OAuth2Client(process.env.MAILING_SERVICE_CLIENT_ID);

module.exports = AsyncHandler(async (req, res, next) => {
  const { token } = req.body;

  const ticket = await Client.verifyIdToken({
    idToken: token,
  });

  const { name, email, picture } = ticket.getPayload();

  if (!name || !email || !picture)
    return next(new ErrorHandler('هذا الحساب غير مسجل بجوجل', 404));

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new ErrorHandler('هذا الحساب غير مسجل لدينا', 404));

  // if (!name || !email || !picture || !user)
  //   return next(new ErrorHandler('This User Not Exist!', 404));

  return res.status(200).json({
    name,
    email,
    picture,
    user,
  });
});
