const RealState = require('../../../models/RealState');

module.exports = async ({
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
  // urgent,
  page,
  limit_query,
  res,
}) => {
  const PAGE_SIZE = 9;

  const limit = parseInt(PAGE_SIZE) || 9;
  const skip = (page - 1) * PAGE_SIZE;
  const pageSize = parseInt(page - 1) * PAGE_SIZE;
  const allDataLength = await RealState.find({}).countDocuments();
  const pagesCount = Math.ceil(allDataLength / limit);

  let realStates = await RealState.find({})
    .populate('owner')
    .limit(limit)
    .skip(skip);

  if (limit_query) {
    realStates = await RealState.find({}).populate('owner').limit(limit_query);
  }

  /************* Search ******** */
  if (search) {
    realStates = await RealState.find({
      $or: [
        {
          'general.title': { $regex: search, $options: 'i' },
          'general.description': { $regex: search, $options: 'i' },
        },
      ],
    });

    return res.status(200).json({
      success: true,
      count: realStates.length,
      realStates,
    });
  } else if (search && search.length <= 0) {
    return res.status(200).json({
      success: true,
      count: realStates.length,
      realStates,
    });
  }

  /************* Price ******** */

  if (price) {
    if (+price.gte > +price.lte) {
      [price.gte, price.lte] = [price.lte, price.gte];
    }
    if (price.gte && !price.lte) {
      realStates = await RealState.find({
        price: { $gte: +price.gte },
      });

      return res.status(200).json({
        success: true,
        count: realStates.length,
        realStates,
      });
    } else if (price.lte && !price.gte) {
      realStates = await RealState.find({
        price: { $lte: +price.lte },
      });

      return res.status(200).json({
        success: true,
        count: realStates.length,
        realStates,
      });
    } else if (price.gte && price.lte) {
      realStates = await RealState.find({
        price: { $gte: +price.gte, $lte: +price.lte },
      });
    }
  }

  /************* Type ******** */

  if (type) {
    realStates = await RealState.find({
      'general.propertyType': type,
    });

    return res.status(200).json({
      success: true,
      count: realStates.length,
      realStates,
    });
  }

  /************* Placement ******** */

  if (placement) {
    realStates = await RealState.find({
      placement,
    });

    return res.status(200).json({
      success: true,
      count: realStates.length,
      realStates,
    });
  }

  /************* Urgent ******** */

  // if (urgent) {
  //   realStates = await RealState.find({
  //     urgent,
  //   });

  //   return res.status(200).json({
  //     success: true,
  //     count: realStates.length,
  //     realStates,
  //   });
  // }

  /***************************************** Features ***************************************** */

  if (features) {
    if (features.bedroom) {
      realStates = await RealState.find({})
        .where('features.bedroom')
        .equals(parseInt(features.bedroom));
    } else if (features.bathroom) {
      realStates = await RealState.find({})
        .where('features.bathroom')
        .equals(parseInt(features.bathroom));
    } else if (features.kitchen) {
      realStates = await RealState.find({})
        .where('features.kitchen')
        .equals(parseInt(features.kitchen));
    } else if (features.balcony) {
      realStates = await RealState.find({})
        .where('features.balcony')
        .equals(parseInt(features.balcony));
    } else if (features.garage) {
      realStates = await RealState.find({})
        .where('features.garage')
        .equals(parseInt(features.garage));
    }
  }

  /***************************************** Country ***************************************** */

  if (country) {
    realStates = await RealState.find({
      'location.country': country,
    });
  }

  /***************************************** City ***************************************** */

  if (city) {
    realStates = await RealState.find({
      'location.city': city,
    });
  }

  /***************************************** Area ***************************************** */

  if (area) {
    realStates = await RealState.find({
      'location.area': area,
    });
  }

  /***************************************** State Age ***************************************** */

  if (stateAge) {
    if (stateAge.gte > stateAge.lte) {
      [stateAge.gte, stateAge.lte] = [[stateAge.lte, stateAge.gte]];
    }
    if (stateAge.gte && stateAge.lte) {
      realStates = await RealState.find({
        'general.yearBuilt': { $gte: +stateAge.gte, $lte: +stateAge.lte },
      });
    } else if ((stateAge.gte && !stateAge.lte) || stateAge.lte === '') {
      realStates = await RealState.find({
        'general.yearBuilt': { $gte: +stateAge.gte },
      });
    } else if ((stateAge.lte && !stateAge.gte) || stateAge.gte === '') {
      realStates = await RealState.find({
        'general.yearBuilt': { $lte: +stateAge.lte },
      });
    }
  }

  /***************************************** State Space ***************************************** */

  if (space) {
    if (space.gte > space.lte) {
      [space.gte, space.lte] = [[space.lte, space.gte]];
    }
    if (space.gte && space.lte) {
      realStates = await RealState.find({
        space: { $gte: +space.gte, $lte: +space.lte },
      });
    } else if ((space.gte && !space.lte) || space.lte === '') {
      realStates = await RealState.find({
        space: { $gte: +space.gte },
      });
    } else if ((space.lte && !space.gte) || space.gte === '') {
      realStates = await RealState.find({
        space: { $lte: +space.lte },
      });
    }
  }

  /***************************************** State Rooms ***************************************** */

  if (rooms) {
    if (rooms.gte) {
      realStates = await RealState.find({
        'features.bedroom': { $gte: +rooms.gte },
      });
    } else {
      realStates = await RealState.find({
        'features.bedroom': rooms,
      });
    }
  }

  /************* Sorting ******** */

  if (sorting === 'new') {
    realStates = await RealState.find().sort({ createdAt: -1 });
  } else if (sorting === 'old') {
    realStates = await RealState.find().sort({ createdAt: 1 });
  } else if (sorting === 'high-price') {
    realStates = await RealState.find().sort({ price: -1 });
  } else if (sorting === 'low-price') {
    realStates = await RealState.find().sort({ price: 1 });
  } else if (sorting === 'high-space') {
    realStates = await RealState.find().sort({ space: -1 });
  } else if (sorting === 'low-space') {
    realStates = await RealState.find().sort({ space: 1 });
  } else if (sorting === 'sale') {
    realStates = await RealState.find({ placement: 'sale' });
  } else if (sorting === 'sale?residential?house') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'house',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?room') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'room',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?apartment') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'apartment',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?townhouse') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'townhouse',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?villa') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'villa',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?land') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'land',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?office') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'office',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?warehouse') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'warehouse',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?residential?farm') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'farm',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent') {
    realStates = await RealState.find({ placement: 'rent' });
  } else if (sorting === 'rent?residential?house') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'house',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?room') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'room',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?apartment') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'apartment',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?townhouse') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'townhouse',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?villa') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'villa',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?land') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'land',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?office') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'office',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?warehouse') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'warehouse',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'rent?residential?farm') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'farm',
      'general.propertyPurpose': 'residential',
    });
  } else if (sorting === 'sale?commercial?house') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'house',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?room') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'room',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?apartment') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'apartment',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?townhouse') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'townhouse',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?villa') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'villa',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?land') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'land',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?office') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'office',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?warehouse') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'warehouse',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'sale?commercial?farm') {
    realStates = await RealState.find({
      placement: 'sale',
      'general.propertyType': 'farm',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?house') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'house',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?room') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'room',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?apartment') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'apartment',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?townhouse') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'townhouse',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?villa') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'villa',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?land') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'land',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?office') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'office',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?warehouse') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'warehouse',
      'general.propertyPurpose': 'commercial',
    });
  } else if (sorting === 'rent?commercial?farm') {
    realStates = await RealState.find({
      placement: 'rent',
      'general.propertyType': 'farm',
      'general.propertyPurpose': 'commercial',
    });
  }

  res.status(200).json({
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
