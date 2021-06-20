const express = require('express');
const router = express.Router();

const authenticateController = require('../controllers/authenticateController')

router.get('/authenticate', authenticateController.authenticateUser)

// router.get('/value/:id', tickerController.getValue)


module.exports = router;