"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistSongs = exports.getLikedSongs = void 0;
var axios_1 = __importDefault(require("axios"));
var querystring = require('querystring');
var redirect_uri = 'http://localhost:3000/callback';
var client_id = '300ac0b33203415b98bd63ec4146c74c';
var client_secret = 'a78fd6a2e88a4d0282c4c8724771646f';
var likedSongUri = 'https://api.spotify.com/v1/me/tracks';
var START_LIKED_SONGS = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US';
//Function adds user to database then redirects user to the main page.
function getLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function recursiveSpotify(url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, _b, error_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 1:
                            response = _c.sent();
                            if (response.data.next == null) {
                                return [2 /*return*/, response.data.items];
                            }
                            console.log(response.data.next);
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, recursiveSpotify(response.data.next)];
                        case 2: return [2 /*return*/, (_b.apply(_a, [_c.sent()]))];
                        case 3:
                            error_1 = _c.sent();
                            switch (error_1.response.status) {
                                case 429:
                                    console.log("timeout error");
                                    setTimeout(function () {
                                    }, 5000);
                                    return [2 /*return*/, (recursiveSpotify(url))];
                                    break;
                            }
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var totalLikedSongs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /*Possible to make function faster by getting the total amount of songs in the first url
                    and using the total songs to calculate amount of requests needed to be done and asyncronously
                    creating all requests.
                    */
                    console.log("GETTING LIKED SONGS");
                    console.log(req.session["access_token"]);
                    return [4 /*yield*/, recursiveSpotify(START_LIKED_SONGS)];
                case 1:
                    totalLikedSongs = _a.sent();
                    console.log("completed");
                    console.log(totalLikedSongs.length);
                    res.send(totalLikedSongs);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getLikedSongs = getLikedSongs;
function getPlaylistSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function getSongsFromPlaylist(url, playlistId, playlistName) {
            return __awaiter(this, void 0, void 0, function () {
                var response, item, _a, _b, error_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 1:
                            response = _c.sent();
                            if (response.data.next == null) {
                                return [2 /*return*/, response.data.items];
                            }
                            console.log(response.data.next);
                            for (item in response.data.items) {
                                response.data.items[item]["playlist_id"] = playlistId;
                                response.data.items[item]["playlist_name"] = playlistName;
                            }
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, getSongsFromPlaylist(response.data.next, playlistId, playlistName)];
                        case 2: return [2 /*return*/, (_b.apply(_a, [_c.sent()]))];
                        case 3:
                            error_2 = _c.sent();
                            switch (error_2.response.status) {
                                case 429:
                                    console.log("timeout error");
                                    setTimeout(function () {
                                    }, 5000);
                                    return [2 /*return*/, (getSongsFromPlaylist(url, playlistId, playlistName))];
                                    break;
                            }
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        function getPlaylists(url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, _b, error_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 1:
                            response = _c.sent();
                            if (response.data.next == null) {
                                return [2 /*return*/, response.data.items];
                            }
                            console.log(response.data.next);
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, getPlaylists(response.data.next)];
                        case 2: return [2 /*return*/, (_b.apply(_a, [_c.sent()]))];
                        case 3:
                            error_3 = _c.sent();
                            switch (error_3.response.status) {
                                case 429:
                                    console.log("timeout error");
                                    setTimeout(function () {
                                    }, 5000);
                                    return [2 /*return*/, (getPlaylists(url))];
                                    break;
                            }
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var allPlaylistUrl, playlists, playlistIndex, combinedPlaylistPromise, combinedPlaylistInfo, playlistIndex, playlistPromises, combinedPlaylists, uniqueTracks, playlistIndex, songIndex, uniqueTracksArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("GETTING PLAYLIST SONGS");
                    allPlaylistUrl = 'https://api.spotify.com/v1/me/playlists?limit=50';
                    return [4 /*yield*/, getPlaylists(allPlaylistUrl)
                        //Removing all playlits not created by current user
                    ];
                case 1:
                    playlists = _a.sent();
                    //Removing all playlits not created by current user
                    for (playlistIndex in playlists) {
                        if (playlists[playlistIndex].owner.id != '12185463800') {
                            playlists.splice(playlistIndex, 1);
                        }
                    }
                    combinedPlaylistPromise = [];
                    combinedPlaylistInfo = [];
                    for (playlistIndex in playlists) {
                        playlistPromises = getSongsFromPlaylist(playlists[playlistIndex].tracks.href, playlists[playlistIndex].id, playlists[playlistIndex].name);
                        combinedPlaylistPromise.push(playlistPromises);
                    }
                    return [4 /*yield*/, Promise.all(combinedPlaylistPromise)
                        /*Taking only unique songs from playlists as when combining playlists there will be some songs that are the exact same
                        this is done using a json object so that we remove all duplicates efficiently.
                        */
                    ];
                case 2:
                    combinedPlaylists = _a.sent();
                    uniqueTracks = {};
                    for (playlistIndex in combinedPlaylists) {
                        for (songIndex in combinedPlaylists[playlistIndex]) {
                            try {
                                uniqueTracks[combinedPlaylists[playlistIndex][songIndex].track.id] = combinedPlaylists[playlistIndex][songIndex];
                            }
                            catch (error) {
                                console.log("not there");
                                console.log(combinedPlaylists[playlistIndex][songIndex]);
                            }
                        }
                    }
                    uniqueTracksArr = [];
                    uniqueTracksArr = Object.values(uniqueTracks);
                    res.send(uniqueTracksArr);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPlaylistSongs = getPlaylistSongs;
