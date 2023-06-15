const userRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  updateUserJoi,
} = require('../middlewares/joi');

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUserJoi, updateUser);

module.exports = userRouter;
