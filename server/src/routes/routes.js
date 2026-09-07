'use strict';

const express = require('express');

const AudioRoutes = require('./convertAudio.js');

const router = express.Router();

router.use('/api/audio', AudioRoutes);

module.exports = router;