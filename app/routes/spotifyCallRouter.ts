import express from 'express';
const router = express.Router();

const spotifyCallController = require('../controllers/spotifyCallController');

router.get('/getLikedSongs', spotifyCallController.getLikedSongs);
router.get('/getPlaylistSongs', spotifyCallController.getPlaylistSongs);
router.get('/getProfile', spotifyCallController.getProfile);
router.get('/getGenre', spotifyCallController.getGenre);
router.post('/createPlaylist', spotifyCallController.createPlaylist) 
router.put('/addLikedSongs', spotifyCallController.addLikedSongs)
router.post('/addSongsToPlaylist', spotifyCallController.addSongsToPlaylist)
router.delete('/removeLikedSongs', spotifyCallController.removeLikedSongs);
router.get('/top', spotifyCallController.top)
export default router;