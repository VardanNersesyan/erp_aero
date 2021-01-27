const express = require('express');
const { body } = require('express-validator');
const { valid } = require('../middleware');

const router = express.Router();

router.post('/signin', [
    body('id').isEmail().trim(),
    body('password').isString().notEmpty(),
], valid);

router.post('/signin/new_token', valid);

router.post('/signup', valid);

router.get('/info');
router.get('/logout');

module.exports = router;
