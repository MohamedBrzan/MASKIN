const express = require('express');
const CreateAd = require('../controllers/AdControllers/CreateAd');
const GetAllAds = require('../controllers/AdControllers/GetAllAds');
const UpdateAd = require('../controllers/AdControllers/UpdateAd');
const DeleteAd = require('../controllers/AdControllers/DeleteAd');
const FindAdById = require('../controllers/AdControllers/FindAdById');

const Authentication = require('../middleWare/Authentication');
const AcceptAd = require('../controllers/AdControllers/AcceptAd');
const router = express.Router();

router
  .route('/')
  .get(GetAllAds)
  .post(Authentication, CreateAd)
  .put(Authentication, AcceptAd)
  .delete(DeleteAd);

module.exports = router;
