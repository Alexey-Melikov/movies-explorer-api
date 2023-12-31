const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, saltRounds } = require('../configuration');
const userSchema = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const Unauthorized = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/conflictError');
const IncorrectError = require('../errors/incorrectError');

module.exports.getUser = (req, res, next) => {
  userSchema
    .findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new IncorrectError('Incorrect data was passed.'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('User with specified id was not found.'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('user with this email is already registered.'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError('Incorrect data was passed.'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('User with specified id was not found.'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, saltRounds)
    .then((hash) => userSchema
      .create({
        name,
        email,
        password: hash,
      }))
    .then((user) => {
      const userWithOutPassword = user.toObject({ useProjection: true });
      res.status(201).send(userWithOutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('user with this email is already registered.'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError('Incorrect data was passed.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  userSchema.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new Unauthorized('wrong email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new Unauthorized('wrong email or password'));
          }
          const token = jwt.sign(
            { _id: user._id },
            process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          }).send({ token });
        }).catch(next);
    });
};
