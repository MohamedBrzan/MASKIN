const express = require('express');
const CreateBlog = require('../controllers/BlogControllers/CreateBlog');
const UpdateBlog = require('../controllers/BlogControllers/UpdateBlog');
const DeleteBlog = require('../controllers/BlogControllers/DeleteBlog');
const Authentication = require('../middleWare/Authentication');
const MakeBlogReview = require('../controllers/BlogControllers/MakeBlogReview');
const DeleteBlogImage = require('../controllers/BlogControllers/DeleteBlogImage');
const GetAllBlogs = require('../controllers/BlogControllers/GetAllBlogs');
const FindBlogById = require('../controllers/BlogControllers/FindBlogById');
const router = express.Router();

router.route('/').get(GetAllBlogs).post(Authentication, CreateBlog);

router
  .route('/:id')
  .get(FindBlogById)
  .put(Authentication, UpdateBlog)
  .delete(Authentication, DeleteBlog);

router.route('/reviews').post(Authentication, MakeBlogReview);
router.route('/images').delete(Authentication, DeleteBlogImage);

module.exports = router;
