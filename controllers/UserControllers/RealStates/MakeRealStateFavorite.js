const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const RealState = require('../../../models/RealState');
const User = require('../../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const realState = await RealState.findById(id);

  // if (!realState)
  //   return next(new ErrorHandler('This RealState Not Exist', 404));

  if (!realState)
    return next(
      new ErrorHandler(` هذا العقار  غير موجود فى قاعدة البيانات`),
      404
    );

  const user = await User.findById(req.user.id);

  if (realState && realState.owner.toString() === req.user.id.toString())
    return next(new ErrorHandler('أنت مالك هذا العقار بالفعل', 500));

  // if (realState.owner.toString() === req.user.id)
  //   return next(new ErrorHandler('You Are The Owner Of This RealState', 500));

  const findRealState = user.realStateFavorites.find(
    (realState) => realState._id.toString() === id
  );

  if (findRealState) {
    // return res.status(200).json({
    //   success: true,
    //   message: 'This RealState Already In Your Favorites',
    // });
    return res.status(200).json({
      success: true,
      message: 'هذا العقار موجود بالفعل فى مفضلاتك',
    });
  } else {
    user.realStateFavorites.push(realState._id);

    await user.save();

    // return res.status(200).json({
    //   success: true,
    //   message: 'RealState Added Successfully To Your Favorites',
    // });

    return res.status(200).json({
      success: true,
      message: 'تم إضافة العقار إلى مفضلاتك بنجاح',
    });
  }
});
