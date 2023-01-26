const AsyncHandler = require('../../middleWare/AsyncHandler');
const RealState = require('../../models/RealState');
const User = require('../../models/User');

module.exports = AsyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    images,
    propertyStatus,
    placement,
    price,
    urgent,
  } = req.body;

  const user = await User.findById(req.user.id);

  const general = {
    title: req.body.general.title,
    description: req.body.general.description,
    images: req.body.general.images,
    propertyType: req.body.general.propertyType,
    propertyPurpose: req.body.general.propertyPurpose,
    yearBuilt: req.body.general.yearBuilt,
  };

  const location = {
    city: req.body.location.city,
    area: req.body.location.area,
    district: req.body.location.district,
    address: req.body.location.address,
    blockNo: req.body.location.blockNo,
  };

  const dimensions = {
    height: req.body.dimensions.height,
    width: req.body.dimensions.width,
  };

  const features = {
    bedroom: req.body.features.bedroom,
    bathroom: req.body.features.bathroom,
    kitchen: req.body.features.kitchen,
    balcony: req.body.features.balcony,
    garage: req.body.features.garage,
  };

  const amenities = {
    pool: req.body.amenities.pool,
    elevator: req.body.amenities.elevator,
    airConditioner: req.body.amenities.airConditioner,
    parking: req.body.amenities.parking,
    internet: req.body.amenities.internet,
    security: req.body.amenities.security,
    fireplace: req.body.amenities.fireplace,
    garden: req.body.amenities.garden,
    guestWC: req.body.amenities.guestWC,
    storeRoom: req.body.amenities.storeRoom,
    pets: req.body.amenities.pets,
    gym: req.body.amenities.gym,
    laundry: req.body.amenities.laundry,
  };

  const coordinates = {
    latitude: req.body.coordinates.latitude,
    longitude: req.body.coordinates.longitude,
  };

  const realState = await RealState.create({
    owner: user,
    title,
    description,
    images,
    general,
    location,
    dimensions,
    space: req.body.dimensions.height * req.body.dimensions.width,
    features,
    amenities,
    coordinates,
    propertyStatus,
    placement,
    price,
    urgent,
  });

  user.realStates.push(realState._id);

  await user.save();

  res.status(200).json({
    success: true,
    realState,
  });
});
