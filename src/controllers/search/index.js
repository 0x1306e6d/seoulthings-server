const express = require('express');
const router = express.Router();

router.use('/things', require('./things'));

module.exports = router;