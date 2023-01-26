const AsyncHandler = require('../../middleWare/AsyncHandler');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'messages.user',
  });

  res.status(200).json({
    success: true,
    messages: user.messages.reverse((a, b) => b.createdAt - a.createdAt),
  });
});
