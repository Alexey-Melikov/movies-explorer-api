const userRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

const {
  updateUserJoi,
  // getUserJoi,
} = require('../middlewares/joi');

userRouter.get('/me', getUser); // NEED JOI?
userRouter.patch('/me', updateUserJoi, updateUser);

module.exports = userRouter;
