const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Blog = require('../../models/Blog');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { ratingNum, comment, id } = req.body;

  const user = await User.findById(req.user.id);

  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler('This Blog Not Exist', 404));

  if (blog.owner._id.toString() === req.user.id)
    return next(new ErrorHandler('أنت مالك هذه المدونة بالفعل', 404));
  // if(blog._id.toString()=== req.user.id) return next(new ErrorHandler('This Blog Not Exist', 404));

  // Check IF User Comment Before
  const findUserComment = blog.reviews.find(
    (comment) => comment.user._id.toString() == req.user.id.toString()
  );

  // Calc Average Of Reviews
  const calcBlogRating = async () => {
    let avg = 0;
    blog.reviews.forEach((reviewsNumber) => (avg += reviewsNumber.ratingNum));

    const rating = avg / blog.reviews.length;

    blog.rating = rating;

    await blog.save();
  };

  if (findUserComment) {
    findUserComment.comment = comment;
    findUserComment.ratingNum = ratingNum;

    await blog.save();

    calcBlogRating();

    return res.status(200).json({
      success: true,
      message: 'تم تعديل التقييم المدونة بنجاح',
      blog,
    });
    // return res.status(200).json({
    //   success: true,
    //   message: 'Review Updated Successfully',
    //   blog,
    // });
  } else {
    blog.reviews.push({ user: user.id, comment, ratingNum });

    await blog.save();

    calcBlogRating();

    return res.status(200).json({
      success: true,
      message: 'تم اضافة التقييم المدونة بنجاح',
      blog,
    });
    // return res.status(200).json({
    //   success: true,
    //   message: 'Review Added Successfully',
    //   blog,
    // });
  }
});
