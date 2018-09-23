const express = require('express');
const router = express.Router();

router.get('/bicycle/from/:start/to/:end', require('./bicycle'));
router.get('/medicalDevice/from/:start/to/:end', require('./medicalDevice'));
router.get('/powerBank/from/:start/to/:end', require('./powerBank'));
router.get('/suit/from/:start/to/:end', require('./suit'));
router.get('/tool/from/:start/to/:end', require('./tool'));
router.get('/toy/from/:start/to/:end', require('./toy'));

module.exports = router;