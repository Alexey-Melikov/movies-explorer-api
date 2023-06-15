const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      require: true,
      unique: true,
      type: String,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Неверный email',
      },
    },
    password: {
      type: String,
      require: [true, 'Поле password обязательно'],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
      maxlength: [30, 'Максимальная длина поля "name" - 30 символов'],
      require: [true, 'Поле name обязательно'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
