const AsyncHandler = require('../../../middleWare/AsyncHandler');
const ErrorHandler = require('../../../middleWare/ErrorHandler');
const Blog = require('../../../models/Blog');
const User = require('../../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler('This Blog Not Exist', 404));

  const user = await User.findById(req.user.id);

  const findBlogInUserFavorites = user.blogFavorites.find(
    (blog) => blog._id.toString() === id
  );

  if (findBlogInUserFavorites) {
    return res.status(200).json({
      success: true,
      message: 'This Blog Already In Your Favorites',
    });
  } else {
    user.blogFavorites.push(blog._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Blog Added Successfully To Your Favorites',
    });
  }
});
