const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const Blog = require('../../models/Blog');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, images } = req.body;

  let blog = await Blog.findById(id);

  if (!blog) return next(new ErrorHandler(`This Blog Id ${id} Not Exist`, 404));

  blog = await Blog.findByIdAndUpdate(
    id,
    { title, content, images },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Blog Updated Successfully',
    blog,
  });
});
