const RealState = require('../../../../models/RealState');

module.exports = async (
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
) => {
  const PAGE_SIZE = 9;

  const limit = parseInt(PAGE_SIZE) || 9;
  const skip = (page - 1) * PAGE_SIZE;
  const pageSize = parseInt(page - 1) * PAGE_SIZE;
  const allDataLength = await RealState.find({}).countDocuments();
  const pagesCount = Math.ceil(allDataLength / limit);

  let realStates = await RealState.find({ owner: user })
    .limit(limit)
    .skip(skip);

  /************* Search ******** */
  if (search) {
    realStates = realStates.filter(
      (realState) =>
        realState.general.title.includes(search) ||
        realState.general.description.includes(search)
    );
  }

  /************* Price ******** */

  if (price) {
    if (+price.gte > +price.lte) {
      [price.gte, price.lte] = [price.lte, price.gte];
    }

    if (price.gte) {
      const realStates = await RealState.find({
        owner: user,
        price: { $gte: +price.gte },
      });

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    } else if (price.lte) {
      const realStates = await RealState.find({
        owner: user,
        price: { $lte: +price.lte },
      });

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    } else if (price.gte && price.lte) {
      const realStates = await RealState.find({
        owner: user,
        price: { $gte: +price.gte, $lte: +price.lte },
      });

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    }
  }

  /************* Type ******** */

  if (type) {
    let data = await RealState.find({
      owner: user,
    });

    const realStates = data.filter(
      (realState) => realState.general.propertyType === type
    );

    return res.status(200).json({
      success: true,
      count: realStates.length,
      realStates: realStates,
    });
  }

  /************* Placement ******** */

  if (placement) {
    const realStates = await RealState.find({
      owner: user,
      placement,
    });
    return res.status(200).json({
      success: true,
      count: realStates.length,
      realStates: realStates,
    });
  }

  /************* Urgent ******** */

  if (urgent) {
    realStates = await RealState.find({
      owner: user,
      urgent,
    });
    return res.status(200).json({
      success: true,
      count: realStates.length,
      realStates: realStates,
    });
  }

  /***************************************** Features ***************************************** */

  if (features) {
    if (features.bedroom) {
      const realStates = await RealState.find({
        owner: user,
      })
        .where('features.bedroom')
        .equals(+features.bedroom);

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    } else if (features.bathroom) {
      const realStates = await RealState.find({
        owner: user,
      })
        .where('features.bathroom')
        .equals(+features.bathroom);

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    } else if (features.kitchen) {
      const realStates = await RealState.find({
        owner: user,
      })
        .where('features.kitchen')
        .equals(+features.kitchen);

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    } else if (features.balcony) {
      const realStates = await RealState.find({
        owner: user,
      })
        .where('features.balcony')
        .equals(+features.balcony);

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    } else if (features.garage) {
      const realStates = await RealState.find({
        owner: user,
      })
        .where('features.garage')
        .equals(+features.garage);

      return res.status(200).json({
        success: true,
        count: realStates.length || 0,
        realStates: realStates || [],
      });
    }
  }

  /************* Sorting ******** */
  if (sorting === 'new') {
    realStates = user.realStates.sort((a, b) => a.createdAt - b.createdAt);
  } else if (sorting === 'old') {
    realStates = user.realStates.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sorting === 'high-rating') {
    realStates = user.realStates.sort((a, b) => b.rating - a.rating);
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realStates.sort((a, b) => b.rating - a.rating)) ||
          (realState.general.description.includes(search) &&
            realStates.sort((a, b) => b.rating - a.rating))
      );
    }
  } else if (sorting === 'low-rating') {
    realStates = user.realStates.sort((a, b) => a.rating - b.rating);
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realStates.sort((a, b) => a.rating - b.rating)) ||
          (realState.general.description.includes(search) &&
            realStates.sort((a, b) => a.rating - b.rating))
      );
    }
  } else if (sorting === 'high-price') {
    realStates = user.realStates.sort((a, b) => b.price - a.price);
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realStates.sort((a, b) => b.price - a.price)) ||
          (realState.general.description.includes(search) &&
            realStates.sort((a, b) => b.price - a.price))
      );
    }
  } else if (sorting === 'low-price') {
    realStates = user.realStates.sort((a, b) => a.price - b.price);
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realStates.sort((a, b) => a.price - b.price)) ||
          (realState.general.description.includes(search) &&
            realStates.sort((a, b) => a.price - b.price))
      );
    }
  } else if (sorting === 'high-space') {
    realStates = user.realStates.sort(
      (a, b) =>
        b.dimensions.height * b.dimensions.width -
        a.dimensions.height * a.dimensions.width
    );
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realStates.sort(
              (a, b) =>
                b.dimensions.height * b.dimensions.width -
                a.dimensions.height * a.dimensions.width
            )) ||
          (realState.general.description.includes(search) &&
            realStates.sort(
              (a, b) =>
                b.dimensions.height * b.dimensions.width -
                a.dimensions.height * a.dimensions.width
            ))
      );
    }
  } else if (sorting === 'low-space') {
    realStates = user.realStates.sort(
      (a, b) =>
        a.dimensions.height * a.dimensions.width -
        b.dimensions.height * b.dimensions.width
    );
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realStates.sort(
              (a, b) =>
                a.dimensions.height * a.dimensions.width -
                b.dimensions.height * b.dimensions.width
            )) ||
          (realState.general.description.includes(search) &&
            realStates.sort(
              (a, b) =>
                a.dimensions.height * a.dimensions.width -
                b.dimensions.height * b.dimensions.width
            ))
      );
    }
  } else if (sorting === 'sale') {
    realStates = user.realStates.filter(
      (realState) => realState.placement === 'sale'
    );
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realState.placement === 'sale') ||
          (realState.general.description.includes(search) &&
            realState.placement === 'sale')
      );
    }
  } else if (sorting === 'rent') {
    realStates = user.realStates.filter(
      (realState) => realState.placement === 'rent'
    );
    if (search) {
      realStates.filter(
        (realState) =>
          (realState.general.title.includes(search) &&
            realState.placement === 'rent') ||
          (realState.general.description.includes(search) &&
            realState.placement === 'rent')
      );
    }
  }

  return res.status(200).json({
    success: true,
    count: realStates.length,
    allDataLength,
    pageSize,
    constantPageSize: PAGE_SIZE,
    limit,
    page,
    pagesCount,
    realStates,
  });
};
