"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var spotifyCallController = require('../controllers/spotifyCallController');
router.get('/getLikedSongs', spotifyCallController.getLikedSongs);
router.get('/getPlaylistSongs', spotifyCallController.getPlaylistSongs);
exports.default = router;
