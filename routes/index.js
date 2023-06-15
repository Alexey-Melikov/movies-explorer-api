const router = require('express').Router();
const { errors } = require('celebrate');
const NotFoundError = require('../errors/notFoundError');
const userRouter = require('./userRoute');
const movieRouter = require('./movieRoute');

const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { createUserJoi, loginJoi } = require('../middlewares/joi');

// router.use(requestLogger);
router.post('/signup', createUserJoi, createUser); // Регистрация
router.post('/signin', loginJoi, login); // Авторизация

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Wrong way!')));

// router.use(errorLogger);

router.use(errors({ message: 'Validation error!' }));
module.exports = router;
