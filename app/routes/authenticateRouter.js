"use strict";
var express = require('express');
var router = express.Router();
var authenticateController = require('../controllers/authenticateController');
router.get('/authenticate', authenticateController.authenticateUser);
// router.get('/value/:id', tickerController.getValue)
module.exports = router;
