const express = require('express');
const {
  registerValidation,
  loginValidation
} = require('../validator/validator');
const { register, login } = require('../controllers/authController');

const router = new express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;
