const { celebrate, Joi } = require('celebrate');
const RegExp = require('../utils/constants');

const getUserJoi = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().alphanum()
      .length(24),
  }),
});

const createUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
});

const movieJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(RegExp),
    trailerLink: Joi.string().required().pattern(RegExp),
    thumbnail: Joi.string().required().pattern(RegExp),
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
  getUserJoi,
  movieJoi,
  movieIdJoi,
};
