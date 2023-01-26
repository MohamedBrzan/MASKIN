const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const validator = require('validator');

module.exports = AsyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id)
    .select('+password')
    .populate('realStateFavorites')
    .populate('blogFavorites');

  const { avatar, name, bio, oldPassword, newPassword } = req.body;

  const location = {
    state: req.body.location.state,
    country: req.body.location.country,
    city: req.body.location.city,
    blockNo: req.body.location.blockNo,
    address: req.body.location.address,
    zipCode: req.body.location.zipCode,
    phone: req.body.location.phone,
  };

  const links = {
    facebook: req.body.links.facebook,
    twitter: req.body.links.twitter,
    instagram: req.body.links.instagram,
    youtube: req.body.links.youtube,
    linkedin: req.body.links.linkedin,
    snapchat: req.body.links.snapchat,
  };

  //   if(!user) return next(new ErrorHandler(`User ${req.user.id} Not Exist!`));
  if (!user)
    return next(new ErrorHandler(`هذا المستخدم ${req.user.id} غير موجود`));

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!oldPassword && newPassword) {
    return next(new ErrorHandler(`كلمة المرور القديم غير موجود`));
  }

  if (oldPassword && !newPassword) {
    return next(new ErrorHandler(`كلمة المرور الجديد غير موجود`));
  }

  if (oldPassword && !isMatch) {
    return next(
      new ErrorHandler(
        `كلمة المرور القديمة غير صحيحة من فضلك حاول مرة أخرى لاحقاً`
      )
    );
  }

  if (
    !validator.isEmpty(newPassword && oldPassword) &&
    oldPassword === newPassword
  ) {
    return next(
      new ErrorHandler(
        `من فضلك أختر كلمة مرور جديده لا تطابق كلمة المرور القديمة`,
        500
      )
    );
  }

  if (
    !validator.isEmpty(newPassword && oldPassword) &&
    oldPassword !== newPassword
  ) {
    return (user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar,
        name,
        password: await bcrypt.hash(newPassword, 12),
        bio,
        location,
        links,
      },
      {
        new: true,
        runValidators: true,
      }
    ));
  }

  user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar, name, bio, location, links },
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
