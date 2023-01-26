const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Blog = require('../../models/Blog');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { targetImage } = req.body;

  const blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler('This Blog Not Exist', 404));

  const findImage = blog.images.find((image) => image === targetImage);

  if (findImage) {
    const filterImages = blog.images.filter((image) => image !== targetImage);

    blog.images = filterImages;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: 'Image Deleted Successfully',
    });
  } else {
    return next(new ErrorHandler('This Image Blog Not Exist', 404));
  }
});
