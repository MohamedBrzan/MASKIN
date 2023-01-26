const mongoose = require('mongoose');
const { Schema } = mongoose;

const adSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    realStateInfo: {
      general: {
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
          enum: [
            'personal',
            'residential',
            'industrial',
            'commercial',
            'other',
          ],
          default: 'residential',
          required: true,
        },

        space: {
          type: Number,
          require: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },

      location: {
        city: {
          type: String,
          required: true,
        },

        Neighborhood: {
          type: String,
          required: true,
        },

        area: {
          type: String,
          required: true,
        },

        address: {
          type: String,
          required: true,
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
    },

    adInfo: {
      title: {
        type: String,
        required: true,
      },

      adType: {
        type: String,
        enum: ['offer', 'request'],
        trim: true,
        default: 'offer',
        require: true,
      },

      adPurpose: {
        type: String,
        enum: ['sale', 'rent', 'investment'],
        trim: true,
        default: 'sale',
        require: true,
      },

      description: {
        type: String,
        required: true,
      },

      adProfileFile: {
        type: Object,
        require: true,
      },

      adFiles: [
        {
          type: String,
          require: true,
        },
      ],

      mainImage: {
        type: String,
        require: true,
      },
    },

    nationalAccess: {
      advertiserType: {
        type: String,
        enum: [
          'citizen',
          'resident',
          'facility',
          'company',
          'government',
          'private',
        ],
        trim: true,
        default: 'facility',
        require: true,
      },

      commercialRegistrationNo: {
        type: String,
        require: true,
      },

      advertiserCharacter: {
        type: String,
        enum: ['owner', 'agent', 'broker'],
        trim: true,
        default: 'owner',
        require: true,
      },

      advertiserNumber: {
        type: String,
        require: true,
      },

      acceptation: {
        type: Boolean,
        default: false,
      },

      acceptationDate: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ad', adSchema);
