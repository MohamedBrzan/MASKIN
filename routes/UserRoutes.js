const express = require('express');
const IsLogged = require('../controllers/UserControllers/Auth/IsLogged');
const Login = require('../controllers/UserControllers/Auth/Login');
const Logout = require('../controllers/UserControllers/Auth/Logout');
const Register = require('../controllers/UserControllers/Auth/Register');
const GetUserBlogs = require('../controllers/UserControllers/Blogs/GetUserBlogs');
const GetMyRealStates = require('../controllers/UserControllers/RealStates/GetMyRealStates');
const GetMyRealStatesFavorites = require('../controllers/UserControllers/RealStates/GetMyRealStatesFavorites');
const MakeRealStateFavorite = require('../controllers/UserControllers/RealStates/MakeRealStateFavorite');
const DeleteRealStateFavorite = require('../controllers/UserControllers/RealStates/DeleteRealStateFavorite');
const GetMyBlogsFavorites = require('../controllers/UserControllers/Blogs/GetMyBlogsFavorites');
const MakeBlogFavorite = require('../controllers/UserControllers/Blogs/MakeBlogFavorite');
const DeleteBlogFavorite = require('../controllers/UserControllers/Blogs/DeleteBlogFavorite');
const GetMyProfile = require('../controllers/UserControllers/GetMyProfile');
const UpdateMyProfile = require('../controllers/UserControllers/UpdateMyProfile');
const SendMessage = require('../controllers/UserControllers/SendMessage');
const GetMessages = require('../controllers/UserControllers/GetMessages');
const Authentication = require('../middleWare/Authentication');
const IsAdmin = require('../middleWare/IsAdmin');
const DeleteMessage = require('../controllers/UserControllers/DeleteMessage');
const MakeUserReview = require('../controllers/UserControllers/MakeUserReview');
const GetMyReviews = require('../controllers/UserControllers/GetMyReviews');
const ViewsCount = require('../controllers/UserControllers/ViewsCount');
const ReadMessage = require('../controllers/UserControllers/ReadMessage');
const FindUserById = require('../controllers/UserControllers/FindUserById');
const ForgotPassword = require('../controllers/UserControllers/Auth/ForgotPassword');
const ResetPassword = require('../controllers/UserControllers/Auth/ResetPassword');
const ContactUsMessage = require('../controllers/UserControllers/ContactUsMessage');
const GoogleAuthLogin = require('../controllers/UserControllers/Auth/GoogleAuth/GoogleAuthLogin');
const GoogleAuthRegister = require('../controllers/UserControllers/Auth/GoogleAuth/GoogleAuthRegister');
const router = express.Router();

/************************************* Authentication ************************************* */
router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/google/auth/login').post(GoogleAuthLogin);
router.route('/google/auth/register').post(GoogleAuthRegister);
router.route('/logout').get(Logout);
router.route('/logged').get(IsLogged);
router.route('/forgot-password').post(ForgotPassword);
router.route('/reset-password').post(ResetPassword);

/************************************* Profile ************************************* */
router
  .route('/me')
  .get(Authentication, GetMyProfile)
  .put(Authentication, UpdateMyProfile);
router.route('/blogs').get(Authentication, GetUserBlogs);
router.route('/real-states').get(Authentication, GetMyRealStates);

/************************************* Favorites ************************************* */

/********** RealState Favorites *********** */
router
  .route('/real-states/favorites')
  .get(Authentication, GetMyRealStatesFavorites)
  .post(Authentication, MakeRealStateFavorite)
  .delete(Authentication, DeleteRealStateFavorite);

/********** Blogs Favorites *********** */
router
  .route('/blogs/favorites')
  .get(Authentication, GetMyBlogsFavorites)
  .post(Authentication, MakeBlogFavorite)
  .delete(Authentication, DeleteBlogFavorite);

/********** Messages *********** */
// router.route('/messages/:id').delete(Authentication, DeleteMessage);

router
  .route('/messages')
  .get(Authentication, GetMessages)
  .post(Authentication, SendMessage)
  .put(Authentication, ReadMessage)
  .delete(Authentication, DeleteMessage);

/********** Reviews *********** */

router
  .route('/reviews')
  .get(Authentication, GetMyReviews)
  .post(Authentication, MakeUserReview);

/********** Views *********** */

router.route('/views').post(Authentication, ViewsCount);

/************************************* User ************************************* */
router.route('/:id').get(Authentication, FindUserById);

module.exports = router;

/************************************* Admin User ************************************* */
router.route('/contact-us').post(Authentication, ContactUsMessage);

module.exports = router;
