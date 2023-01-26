const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Blog = require('../../models/Blog');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).populate('owner').populate('reviews.user');

  if (!blog) return next(new ErrorHandler('This Blog Not Exist', 404));

  return res.status(200).json({
    success: true,
    blog,
  });
});
