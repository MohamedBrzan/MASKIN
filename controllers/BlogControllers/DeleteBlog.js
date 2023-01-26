const AsyncHandler = require('../../middleWare/AsyncHandler');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const ErrorHandler = require('../../middleWare/ErrorHandler');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.user.id);

  let blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler('This Blog Not Exist!', 404));

  user.blogs.pull(id);

  await user.save();

  blog = await Blog.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Blog Deleted Successfully',
  });
});
