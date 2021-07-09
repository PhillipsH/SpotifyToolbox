import express from 'express';
const router = express.Router();

const spotifyCallController = require('../controllers/spotifyCallController');

router.get('/getLikedSongs', spotifyCallController.getLikedSongs);
router.get('/getPlaylistSongs', spotifyCallController.getPlaylistSongs);

export default router;