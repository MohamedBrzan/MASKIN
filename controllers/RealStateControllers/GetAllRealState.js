const AsyncHandler = require('../../middleWare/AsyncHandler');
const AllRealStatesSortingFilter = require('./helpers/AllRealStatesSortingFilter');
const RealState = require('../../models/RealState');

module.exports = AsyncHandler(async (req, res, next) => {
  const {
    search,
    sorting,
    price,
    features,
    rooms,
    country,
    city,
    area,
    type,
    stateAge,
    space,
    placement,
    urgent,
    limit_query,
  } = req.query;

  const page = parseInt(req.query.page) || 1;

  return AllRealStatesSortingFilter({
    sorting,
    search,
    price,
    features,
    rooms,
    country,
    city,
    area,
    type,
    stateAge,
    space,
    placement,
    urgent,
    page,
    limit_query,
    res,
  });
});
