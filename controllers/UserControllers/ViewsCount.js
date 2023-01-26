const AsyncHandler = require('../../middleWare/AsyncHandler');
const RealState = require('../../models/RealState');
const Blog = require('../../models/Blog');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const blog = await Blog.findById(id).populate('owner');

  if (blog && blog.owner._id.toString() !== req.user.id) {
    const findUserInViews = blog.views.find(
      (view) => view._id.toString() === req.user.id
    );

    if (!findUserInViews) {
      await Blog.findByIdAndUpdate(
        id,
        { $push: { views: req.user.id } },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: 'Views Updated Successfully',
      });
    } else if (blog && !blog.views.length) {
      await Blog.findByIdAndUpdate(
        id,
        { $push: { views: req.user.id } },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: 'Views Updated Successfully',
      });
    } else {
      return res.status(200).json({
        status: false,
        message: 'You Makes Views Before',
      });
    }
  }

  const realState = await RealState.findById(id).populate('owner');

  if (realState && realState.owner._id.toString() !== req.user.id) {
    const findUserInViews = realState.views.find(
      (view) => view._id.toString() === req.user.id
    );

    if (!findUserInViews) {
      await RealState.findByIdAndUpdate(
        id,
        { $push: { views: req.user.id } },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: 'Views Updated Successfully',
      });
    } else if (realState && !realState.views.length) {
      await RealState.findByIdAndUpdate(
        id,
        { $push: { views: req.user.id } },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: 'Views Updated Successfully',
      });
    } else {
      return res.status(200).json({
        status: false,
        message: 'You Makes Views Before',
      });
    }
  }

  return res.status(200).json({
    status: false,
    message: 'Not Found',
  });
});
