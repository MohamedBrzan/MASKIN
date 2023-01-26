const express = require('express');
const CreateAdExpiredStartTime = require('../controllers/AdExpiredControllers/CreateAdExpiredStartTime');
const UpdateAdExpiredStartTime = require('../controllers/AdExpiredControllers/UpdateAdExpiredStartTime');
const GetExpireTimes = require('../controllers/AdExpiredControllers/GetExpireTimes');

const Authentication = require('../middleWare/Authentication');
const DeleteAdFromAdExpire = require('../controllers/AdExpiredControllers/DeleteAdFromAdExpire');
const router = express.Router();

router
  .route('/')
  .get(GetExpireTimes)
  .post(CreateAdExpiredStartTime)
  .put(UpdateAdExpiredStartTime)
  .delete(DeleteAdFromAdExpire);

module.exports = router;
