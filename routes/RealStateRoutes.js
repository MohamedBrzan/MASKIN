const express = require('express');
const CreateRealState = require('../controllers/RealStateControllers/CreateRealState');
const DeleteRealState = require('../controllers/RealStateControllers/DeleteRealState');
const FindRealStateById = require('../controllers/RealStateControllers/FindRealStateById');
const MakeRealStateReview = require('../controllers/RealStateControllers/MakeRealStateReview');
const GetAllRealState = require('../controllers/RealStateControllers/GetAllRealState');
const UpdateRealState = require('../controllers/RealStateControllers/UpdateRealState');
const Authentication = require('../middleWare/Authentication');
const router = express.Router();

router.route('/').get(GetAllRealState).post(Authentication, CreateRealState);

router
  .route('/:id')
  .get(FindRealStateById)
  .put(Authentication, UpdateRealState)
  .delete(Authentication, DeleteRealState);

router.route('/reviews').post(Authentication, MakeRealStateReview);

module.exports = router;
