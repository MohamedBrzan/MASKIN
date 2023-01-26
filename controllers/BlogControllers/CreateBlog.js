const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Blog = require('../../models/Blog');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { title, content, images, tags } = req.body;

  const user = await User.findById(req.user.id);

  if (!title || !content || !images) {
    return next(new ErrorHandler('Please Fill All Fields', 400));
  }

  const blog = await Blog.create({
    owner: user,
    title,
    content,
    images,
    tags,
  });

  user.blogs.push(blog._id);

  await user.save();

  res.status(200).json({
    success: true,
    blog,
  });
});
