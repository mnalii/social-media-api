const express = require('express');
const { get } = require('../controllers/postController');

const router = new express.Router();

router.get('/', get);

module.exports = router;
