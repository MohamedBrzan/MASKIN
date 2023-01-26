const AsyncHandler = require('../../middleWare/AsyncHandler');
const ErrorHandler = require('../../middleWare/ErrorHandler');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findById(req.user.id);

  const findMessage = user.messages.find(
    (message) => message._id.toString() === id.toString()
  );

  if (findMessage) {
    user.messages.filter((message) => message._id.toString() !== id.toString());

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { messages: { _id: id } },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Message Deleted Successfully',
    });
  } else {
    return next(new ErrorHandler('Message Not Found', 404));
  }
});
