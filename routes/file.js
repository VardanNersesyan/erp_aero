const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file-controller');
const multer = require('multer');
const { query } = require('express-validator');
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


router.delete('/delete/:id');
router.get('/download/:id');
router.put('/update/:id');
router.get('/:id');



module.exports = router;
