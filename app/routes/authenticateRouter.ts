import express from 'express';
const router = express.Router();

// const authenticateController = require('../controllers/authenticateController');
import * as authenticateController from '../controllers/authenticateController'

router.get('/', authenticateController.authenticateUser);
router.get('/getTokens', authenticateController.getTokens);

export default router;