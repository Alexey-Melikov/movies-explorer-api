const { celebrate, Joi } = require('celebrate');
const REGEXP_URL = require('../utils/constants');

const createUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const movieJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEXP_URL),
    trailerLink: Joi.string().required().pattern(REGEXP_URL),
    thumbnail: Joi.string().required().pattern(REGEXP_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdJoi = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().alphanum()
      .length(24),
  }),
});

module.exports = {
  createUserJoi,
  loginJoi,
  updateUserJoi,
  movieJoi,
  movieIdJoi,
};
