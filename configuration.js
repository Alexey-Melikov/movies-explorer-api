const rateLimit = require('express-rate-limit');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { JWT_SECRET } = process.env;
const saltRounds = 10;

module.exports = {
  limiter,
  PORT,
  DB_URL,
  JWT_SECRET,
  saltRounds,
};
