const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file-controller');
const multer = require('multer');

router.post(
    '/upload',
    multer().single('file'),
    fileController.upload
);



router.get('/list');
router.delete('/delete/:id');
router.get('/download/:id');
router.put('/update/:id');
router.get('/:id');



module.exports = router;
