const AsyncHandler = require('../../../middleWare/AsyncHandler');
const User = require('../../../models/User');
const RealState = require('../../../models/RealState');
const MyRealStatesSortingFilter = require('./helpers/MyRealStatesSortingFilter');

module.exports = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('realStates');

  // let realStates = user.realStates;

  const { search, sorting, price, features, type, placement, urgent } =
    req.query;

  const page = req.query.page || 1;

  return MyRealStatesSortingFilter(
    sorting,
    user,
    search,
    price,
    features,
    type,
    placement,
    urgent,
    page,
    res
  );
});
