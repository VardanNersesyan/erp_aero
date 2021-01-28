const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file-controller');
const multer = require('multer');
const { query, param } = require('express-validator');
const { valid } = require('../middleware');

router.post(
    '/upload',
    multer().single('file'),
    fileController.upload
);

router.get(
    '/list',
    [
        query('page').isNumeric().optional().toInt(),
        query('list_size').isNumeric().optional().toInt(),
    ],
    valid,
    fileController.list
);

router.delete(
    '/delete/:fileId',
    param('fileId').notEmpty().isNumeric().toInt(),
    valid,
    fileController.delete
);
router.put('/update/:fileId');

router.get('/download/:fileId');

router.get(
    '/:fileId',
    param('fileId').notEmpty().isNumeric().toInt(),
    valid,
    fileController.getById
);

module.exports = router;
