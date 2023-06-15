const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      require: true,
    },
    director: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    year: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      validator: (link) => {
        validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
    },
    trailerLink: {
      type: String,
      require: true,
      validator: (link) => {
        validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
    },
    thumbnail: {
      type: String,
      require: true,
      validator: (link) => {
        validator.isURL(link, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      require: true,
    },
    nameRU: {
      type: String,
      require: true,
    },
    nameEN: {
      type: String,
      require: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
