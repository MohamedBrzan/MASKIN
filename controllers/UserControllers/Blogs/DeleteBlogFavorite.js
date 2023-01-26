const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const Blog = require('../../../models/Blog');
const User = require('../../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const blog = await Blog.findById(id);

  const user = await User.findById(req.user.id);

  if (!blog) return next(new ErrorHandler('This Blog Not Exist!', 404));

  const findBlogInUserFavorites = user.blogFavorites.find(
    (blog) => blog._id.toString() === id
  );

  if (findBlogInUserFavorites) {
    user.blogFavorites.pull(blog._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Blog Removed Successfully From Your Favorites',
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'This Blog Not Exist! In Your Favorites',
    });
  }
});
