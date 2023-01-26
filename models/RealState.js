const mongoose = require('mongoose');
const validator = require('validator');

const RealStateSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    general: {
      title: {
        type: String,
        maxLength: [300, 'Title Should Be Less Than 300 Characters'],
        trim: true,
        require: true,
      },

      description: {
        type: String,
        trim: true,
        require: true,
        default: '',
      },

      images: [
        {
          type: String,
          required: true,
        },
      ],

      yearBuilt: {
        type: Number,
        required: true,
      },

      propertyType: {
        type: String,
        enum: [
          'house',
          'room',
          'apartment',
          'townhouse',
          'villa',
          'land',
          'office',
          'warehouse',
          'farm',
          'other',
        ],
        default: 'house',
        required: true,
      },

      propertyPurpose: {
        type: String,
        enum: ['personal', 'residential', 'industrial', 'commercial', 'other'],
        default: 'personal',
        required: true,
      },
    },

    dimensions: {
      height: {
        type: Number,
        require: true,
      },
      width: {
        type: Number,
        require: true,
      },
    },
    space: {
      type: Number,
      require: true,
    },
    location: {
      city: {
        type: String,
        enum: [
          'mecca',
          'medina',
          'riyadh',
          'al qassim',
          'jeddah',
          'hail',
          'al gaw',
          'northern borders',
          'eastern province',
          'najran',
          'jazan',
          'asiri',
          'al Baha',
          'tabuk',
        ],
        default: 'riyadh',
        required: true,
      },

      area: {
        type: String,
      },

      district: {
        type: String,
      },

      address: {
        type: String,
        required: true,
      },

      blockNo: {
        type: String,
        required: true,
      },
    },

    features: {
      bedroom: {
        type: Number,
        required: true,
      },

      bathroom: {
        type: Number,
        required: true,
      },

      kitchen: {
        type: Number,
        required: true,
      },

      balcony: {
        type: Number,
        required: true,
      },

      garage: {
        type: Number,
        required: true,
      },
    },

    amenities: {
      pool: {
        type: Boolean,
        default: false,
      },

      elevator: {
        type: Boolean,

        default: false,
      },

      airConditioner: {
        type: Boolean,
        default: false,
      },

      parking: {
        type: Boolean,
        default: false,
      },

      internet: {
        type: Boolean,
        default: false,
      },

      security: {
        type: Boolean,
        default: false,
      },

      fireplace: {
        type: Boolean,
        default: false,
      },

      garden: {
        type: Boolean,
        default: false,
      },

      guestWC: {
        type: Boolean,
        default: false,
      },

      storeRoom: {
        type: Boolean,
        default: false,
      },

      pets: {
        type: Boolean,
        default: false,
      },

      gym: {
        type: Boolean,
        default: false,
      },

      laundry: {
        type: Boolean,
        default: false,
      },
    },

    coordinates: {
      latitude: {
        type: Number,
      },

      longitude: {
        type: Number,
      },
    },

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        ratingNum: {
          type: Number,
          require: true,
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],

    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    propertyStatus: {
      type: String,
      enum: ['available', 'sold', 'rented'],
      default: 'available',
    },

    placement: {
      type: String,
      trim: true,
      enum: ['sale', 'rent'],
      default: 'sale',
    },

    price: {
      type: Number,
      required: true,
    },

    urgent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('RealState', RealStateSchema);
