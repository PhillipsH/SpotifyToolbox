import express from 'express';
const router = express.Router();

import * as authenticateController from '../controllers/authenticateController'

router.get('/', authenticateController.authenticateUser);
router.get('/getTokens', authenticateController.getTokens);
router.get('/checkAuth', authenticateController.checkAuth);
router.get('/refreshToken', authenticateController.refreshToken)

export default router;