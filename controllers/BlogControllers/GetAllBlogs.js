const AsyncHandler = require('../../middleWare/AsyncHandler');
const Blog = require('../../models/Blog');

module.exports = AsyncHandler(async (req, res, next) => {
  const { search, sorting, limit_query } = req.query;

  const PAGE_SIZE = 9;
  const page = req.query.page || 1;
  const limit = parseInt(PAGE_SIZE) || 9;
  const skip = (page - 1) * PAGE_SIZE;
  const pageSize = parseInt(page - 1) * PAGE_SIZE;
  const allDataLength = await Blog.find({}).countDocuments();
  const pageCount = Math.ceil(allDataLength / limit);

  let blogs = await Blog.find();

  if (limit_query) {
    blogs = await Blog.find().sort({ createdAt: -1 }).limit(limit_query);
  }

  // search for blogs
  else if (search) {
    blogs = await Blog.find({
      $or: [
        { title: { $regex: `${search}`, $options: 'i' } },
        { content: { $regex: `${search}`, $options: 'i' } },
      ],
    });
  } else if (sorting) {
    if (sorting === 'new') {
      blogs = await Blog.find().sort({ createdAt: -1 });
    } else if (sorting === 'old') {
      blogs = await Blog.find().sort({ createdAt: 1 });
    } else if (sorting === 'high-rating') {
      blogs = await Blog.find().sort({ rating: -1 });
    } else if (sorting === 'low-rating') {
      blogs = await Blog.find().sort({ rating: 1 });
    }
  }

  // get all blogs
  return res.status(200).json({
    success: true,
    limit_query,
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
