const express = require('express');
const { getAuthUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/read-profile', auth, getAuthUser);

module.exports = router;
