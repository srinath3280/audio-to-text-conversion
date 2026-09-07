'use strict';

const express = require('express');
const multer = require('multer');

const AudioController = require('../controllers/convertAudioController');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.get('/test-audio', AudioController.testAudio);
router.post('/convert-audio', upload.single('audio'), AudioController.convertAudio);


module.exports = router;
