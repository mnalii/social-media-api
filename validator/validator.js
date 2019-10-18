const { check, validationResult } = require('express-validator');

const registerValidation = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  }
];

const loginValidation = [
  check('email', 'Please include valid email').isEmail(),
  check('password', 'Password is required !').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  registerValidation,
  loginValidation
};
