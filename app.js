require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { limiter, PORT, DB_URL } = require('./configuration');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());
app.use(helmet());
router.use(requestLogger);
app.use(limiter);
app.use(express.json());

mongoose.connect(DB_URL);
app.use(router);
router.use(errorLogger);
app.use(handleError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
