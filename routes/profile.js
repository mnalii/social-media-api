const express = require('express');
const { get } = require('../controllers/profileController');

const router = new express.Router();

router.get('/', get);

module.exports = router;
