const express = require('express');
const { body } = require('express-validator');
const { valid, auth } = require('../middleware');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.post('/signin', [
    body('id').trim().notEmpty().isLength({ min: 0, max: 255 }),
    body('password').notEmpty()
], valid, authController.signIn);


router.post('/signup', [
    body('id').trim().notEmpty().isLength({ min: 0, max: 255 }),
    body('password').notEmpty()
], valid, authController.register);

router.get('/info', auth, authController.info);
router.get('/logout', auth, authController.logout);

router.post('/signin/new_token', [
    body('token').trim().notEmpty()
], valid, authController.refreshToken);


module.exports = router;
