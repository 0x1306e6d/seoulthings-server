const express = require('express');
const router = express.Router();

router.get('/bicycle/from/:offset/to/:limit', require('./bicycle'));
router.get('/medicalDevice/from/:offset/to/:limit', require('./medicalDevice'));
router.get('/powerBank/from/:offset/to/:limit', require('./powerBank'));
router.get('/suit/from/:offset/to/:limit', require('./suit'));
router.get('/tool/from/:offset/to/:limit', require('./tool'));
router.get('/toy/from/:offset/to/:limit', require('./toy'));

module.exports = router;