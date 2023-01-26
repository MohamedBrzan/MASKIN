const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { userId, reviewNum, review } = req.body;

  const user = await User.findById(userId).populate('reviews.user');

  // if (!user) return next(new ErrorHandler('User not found', 404));
  if (!user) return next(new ErrorHandler('هذا المستخدم غير موجود', 404));

  const reviewer = await User.findById(req.user.id).populate('reviews.user');

  // if (user._id.toString() === reviewer._id.toString())
  //   return next(new ErrorHandler('You can not review yourself', 400));

  if (user._id.toString() === reviewer._id.toString())
    return next(new ErrorHandler('لا يمكن أن تقيم نفسك', 400));

  // Check IF User Reviewed Before
  const findUserReview = user.reviews.find(
    (review) => review.user._id.toString() === req.user.id.toString()
  );

  // Calc Average Of Reviews
  const calcUserRating = async () => {
    let avg = 0;
    user.reviews.forEach((reviewsNumber) => (avg += reviewsNumber.reviewNum));

    const rating = avg / user.reviews.length;

    user.rating = rating;

    await user.save();
  };

  if (findUserReview) {
    findUserReview.review = review;
    findUserReview.reviewNum = reviewNum;

    await findUserReview.save();

    calcUserRating();

    // return res.status(200).json({
    //   success: true,
    //   message: 'Review Updated Successfully',
    //   user,
    // });

    return res.status(200).json({
      success: true,
      message: 'تم تحديث التقييم بنجاح',
      user,
    });
  } else {
    user.reviews.push({ user: req.user.id, review, reviewNum });

    await user.save();

    calcUserRating();

    // return res.status(200).json({
    //   success: true,
    //   message: 'Review Added Successfully',
    //   user,
    // });

    return res.status(200).json({
      success: true,
      message: 'تم إضافة التقييم بنجاح',
      user,
    });
  }
});
