const AsyncHandler = require('../../middleWare/AsyncHandler');
const Ad = require('../../models/Ad');
const User = require('../../models/User');
const { Parser, parse } = require('json2csv');
const NationCheck = require('../../models/NationCheck');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const realStateInfo = {
    general: {
      propertyType: req.body.realStateInfo.general.propertyType,
      propertyPurpose: req.body.realStateInfo.general.propertyPurpose,
      space: req.body.realStateInfo.general.space,
      price: req.body.realStateInfo.general.price,
    },
    location: {
      city: req.body.realStateInfo.location.city,
      Neighborhood: req.body.realStateInfo.location.neighborhood,
      area: req.body.realStateInfo.location.area,
      address: req.body.realStateInfo.location.address,
    },

    coordinates: {
      latitude: req.body.realStateInfo.coordinates.latitude,
      longitude: req.body.realStateInfo.coordinates.longitude,
    },
  };

  const adInfo = {
    title: req.body.adInfo.title,
    description: req.body.adInfo.description,
    adType: req.body.adInfo.adType,
    adPurpose: req.body.adInfo.adPurpose,
    adProfileFile: req.body.adInfo.adProfileFile,
    mainImage: req.body.adInfo.mainImage,
    adFiles: req.body.adInfo.adFiles,
  };

  const nationalAccess = {
    advertiserType: req.body.nationalAccess.advertiserType,
    advertiserCharacter: req.body.nationalAccess.advertiserCharacter,
    commercialRegistrationNo: req.body.nationalAccess.commercialRegistrationNo,
    advertiserNumber: req.body.nationalAccess.advertiserNumber,
  };

  const ad = await Ad.create({
    realStateInfo,
    adInfo,
    nationalAccess,
    owner: user._id,
  });

  const csv = parse(ad);

  await NationCheck.create({
    _id: ad._id,
    ad: csv,
  });

  user.ads.push(ad._id);

  await user.save();

  res.status(200).json({
    success: true,
    ad,
  });
});
