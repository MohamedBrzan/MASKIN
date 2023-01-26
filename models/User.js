const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      minLength: [3, 'userName Must be at least 3 characters'],
      maxLength: [30, 'userName Must be less than 20 characters'],
      require: true,
    },

    email: {
      type: String,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
      },
      unique: true,
      require: true,
    },

    password: {
      type: String,
      trim: true,
      minLength: [8, 'password Must be at least 6 characters'],
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
      },
      select: false,
      require: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    location: {
      state: {
        type: String,
        trim: true,
        default: '',
      },

      country: {
        type: String,
        trim: true,
        default: '',
      },

      blockNo: {
        type: String,
        trim: true,
        default: '',
      },

      city: {
        type: String,
        trim: true,
        default: '',
      },

      address: {
        type: String,
        trim: true,
        default: '',
      },

      zipCode: {
        type: Number,
      },

      phone: {
        type: String,
        trim: true,
        default: '',
      },
    },

    links: {
      facebook: {
        type: String,
        trim: true,
        default: '',
      },
      twitter: {
        type: String,
        trim: true,
        default: '',
      },
      youtube: {
        type: String,
        trim: true,
        default: '',
      },
      instagram: {
        type: String,
        trim: true,
        default: '',
      },
      linkedin: {
        type: String,
        trim: true,
        default: '',
      },
      snapchat: {
        type: String,
        trim: true,
        default: '',
      },
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    isActive: {
      type: Boolean,
      default: false,
      require: true,
    },

    messages: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        message: {
          type: String,
          trim: true,
          maxLength: [200, 'Message must be less than 200 characters'],
          require: true,
        },
        realState: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RealState',
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    realStates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RealState',
      },
    ],

    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],

    blogFavorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],

    realStateFavorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RealState',
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        review: {
          type: String,
          trim: true,
          require: true,
        },
        reviewNum: {
          type: Number,
          require: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    ads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
      },
    ],

    clientsMessages: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        message: {
          type: String,
          trim: true,
          maxLength: [200, 'Message must be less than 200 characters'],
          require: true,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

// Hash Password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Match Password to hashed password in database
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Token for UserSchema
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, `${process.env.JWT_SECRET_TOKEN}`, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
  });
  return token;
};

module.exports = mongoose.model('User', userSchema);
