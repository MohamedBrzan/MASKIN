const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const RealState = require('../../models/RealState');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { ratingNum, comment } = req.body;

  const user = await User.findById(req.user.id);

  const realState = await RealState.findById(id);

  if (!realState)
    return next(new ErrorHandler('This RealState Not Exist', 404));

  // Check IF User Comment Before
  const findUserComment = realState.reviews.find(
    (comment) => comment.user.toString() == req.user.id.toString()
  );

  // Calc Average Of Reviews
  const calcRealStateRating = async () => {
    let avg = 0;
    realState.reviews.forEach(
      (reviewsNumber) => (avg += reviewsNumber.ratingNum)
    );

    const rating = avg / realState.reviews.length;

    realState.rating = rating;

    await realState.save();
  };

  if (findUserComment) {
    findUserComment.comment = comment;
    findUserComment.ratingNum = ratingNum;

    await realState.save();

    calcRealStateRating();

    return res.status(200).json({
      success: true,
      message: 'Review Updated Successfully',
      realState,
    });
  } else {
    realState.reviews.push({ user: user.id, comment, ratingNum });

    await realState.save();

    calcRealStateRating();

    return res.status(200).json({
      success: true,
      message: 'Review Added Successfully',
      realState,
    });
  }
});
