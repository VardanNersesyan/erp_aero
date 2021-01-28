const express = require('express');
const router = express.Router();
const { auth } = require('../middleware');

router.use('/auth', require('./auth'));
router.use('/file', auth, require('./file'));

module.exports = router;
