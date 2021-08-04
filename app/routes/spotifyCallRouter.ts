import express from 'express';
const router = express.Router();

const spotifyCallController = require('../controllers/spotifyCallController');

router.get('/getLikedSongs', spotifyCallController.getLikedSongs);
router.get('/getPlaylistSongs', spotifyCallController.getPlaylistSongs);
router.delete('/removeLikedSongs', spotifyCallController.removeLikedSongs);
router.post('/addToPlaylist', spotifyCallController.addToPlaylist);
router.get('/addToPlaylist', spotifyCallController.addToPlaylist);

export default router;