const mongoose = require('mongoose');
const movieSchema = require('../models/movie');

const NotFoundError = require('../errors/notFoundError');
const IncorrectError = require('../errors/incorrectError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  movieSchema
    .find({ owner })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  movieSchema
    .create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError('Incorrect data was passed during movie creation.'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const currentUser = req.user._id;
  movieSchema
    .findById(req.params.movieId)
    .orFail(new NotFoundError('Incorrect data was sent when deleting the movie.'))
    .then((movie) => {
      if (currentUser !== movie.owner.toString()) {
        throw new ForbiddenError('No rights to delete movie.');
      }
      return movieSchema.findByIdAndDelete(movie._id);
    })
    .then(() => res.status(200).send({ message: 'movie deletion was successful' }))
    .catch(next);
};
