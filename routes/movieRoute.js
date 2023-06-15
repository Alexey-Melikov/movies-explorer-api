const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  movieJoi,
  movieIdJoi,
} = require('../middlewares/joi');

movieRouter.get('/', getMovies);
movieRouter.post('/', movieJoi, createMovie);
movieRouter.delete('/:movieId', movieIdJoi, deleteMovie);

module.exports = movieRouter;
