const AsyncHandler = require('../../../middleWare/AsyncHandler');
const User = require('../../../models/User');
const Blog = require('../../../models/Blog');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('blogs');

  const PAGE_SIZE = 9;
  const page = req.query.page || 1;
  const limit = parseInt(PAGE_SIZE) || 9;
  const skip = (page - 1) * PAGE_SIZE;
  const pageSize = parseInt(page - 1) * PAGE_SIZE;
  const allDataLength = await Blog.find({}).countDocuments();
  const pageCount = Math.ceil(allDataLength / limit);

  let blogs = await Blog.find({ owner: user })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  //search in user's blogs

  const { search, sorting } = req.query;

  // search for blogs
  if (search) {
    blogs = await Blog.find({
      owner: user,
      $or: [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
          content: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });
  }

  // if no search
  if (sorting) {
    if (req.query.sorting === 'new') {
      blogs = await Blog.find({ owner: user }).sort({ createdAt: -1 });
    } else if (req.query.sorting === 'old') {
      blogs = await Blog.find({ owner: user }).sort({ createdAt: 1 });
    } else if (req.query.sorting === 'high-rating') {
      blogs = await Blog.find({ owner: user }).sort({ rating: -1 });
    } else if (req.query.sorting === 'low-rating') {
      blogs = await Blog.find({ owner: user }).sort({ rating: 1 });
    }
  }

  return res.status(200).json({
    success: true,
    count: blogs.length,
    allDataLength,
    pageSize,
    constantPageSize: PAGE_SIZE,
    limit,
    page,
    pageCount,
    blogs,
  });
});
