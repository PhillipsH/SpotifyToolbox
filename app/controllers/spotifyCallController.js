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
exports.addToPlaylist = exports.getProfile = exports.removeLikedSongs = exports.getPlaylistSongs = exports.getLikedSongs = void 0;
var axios_1 = __importDefault(require("axios"));
require('dotenv').config();
var redirect_uri = 'http://localhost:3000/callback';
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var refreshTokenUri = 'https://accounts.spotify.com/api/token';
//Function adds user to database then redirects user to the main page.
function getLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function recursiveSpotify(url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, _b, error_1, _c, authData, response;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 3, , 9]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 1:
                            response = _d.sent();
                            if (response.data.next == null) {
                                return [2 /*return*/, response.data.items];
                            }
                            console.log(response.data.next);
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, recursiveSpotify(response.data.next)];
                        case 2: return [2 /*return*/, (_b.apply(_a, [_d.sent()]))];
                        case 3:
                            error_1 = _d.sent();
                            if (error_1.response.status == undefined) {
                                console.log(error_1);
                            }
                            _c = error_1.response.status;
                            switch (_c) {
                                case 429: return [3 /*break*/, 4];
                                case 401: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 4:
                            console.log("timeout error");
                            setTimeout(function () {
                            }, error_1.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, (recursiveSpotify(url))];
                        case 5:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                                    },
                                })];
                        case 6:
                            response = _d.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, (recursiveSpotify(url))];
                        case 7:
                            console.log("OTHER ERROR PLEASE CHECK");
                            return [2 /*return*/, []];
                        case 8: return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        var START_LIKED_SONGS, totalLikedSongs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    START_LIKED_SONGS = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US';
                    console.log("GETTING LIKED SONGS");
                    console.log(req.session["access_token"]);
                    console.log(req.session["profile_id"]);
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
        function recursiveSpotify(url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, _b, error_2, _c, authData, response;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 3, , 9]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 1:
                            response = _d.sent();
                            if (response.data.next == null) {
                                return [2 /*return*/, response.data.items];
                            }
                            console.log(response.data.next);
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, recursiveSpotify(response.data.next)];
                        case 2: return [2 /*return*/, (_b.apply(_a, [_d.sent()]))];
                        case 3:
                            error_2 = _d.sent();
                            if (error_2.response.status == undefined) {
                                console.log(error_2);
                            }
                            _c = error_2.response.status;
                            switch (_c) {
                                case 429: return [3 /*break*/, 4];
                                case 401: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 4:
                            console.log("timeout error");
                            setTimeout(function () {
                            }, 5000);
                            return [2 /*return*/, (recursiveSpotify(url))];
                        case 5:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                                    },
                                })];
                        case 6:
                            response = _d.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, (recursiveSpotify(url))];
                        case 7:
                            console.log("OTHER ERROR PLEASE CHECK");
                            return [2 /*return*/, []];
                        case 8: return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        function recursivePlaylist(url, playlistName, playlistId) {
            return __awaiter(this, void 0, void 0, function () {
                var response, item, _a, _b, error_3, _c, authData, response;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 3, , 9]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 1:
                            response = _d.sent();
                            for (item in response.data.items) {
                                response.data.items[item]["playlist_name"] = playlistName;
                                response.data.items[item]["playlist_id"] = playlistId;
                            }
                            if (response.data.next == null) {
                                return [2 /*return*/, response.data.items];
                            }
                            console.log(response.data.next);
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, recursivePlaylist(response.data.next, playlistName, playlistId)];
                        case 2: return [2 /*return*/, (_b.apply(_a, [_d.sent()]))];
                        case 3:
                            error_3 = _d.sent();
                            if (error_3.response.status == undefined) {
                                console.log(error_3);
                            }
                            _c = error_3.response.status;
                            switch (_c) {
                                case 429: return [3 /*break*/, 4];
                                case 401: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 4:
                            setTimeout(function () {
                            }, error_3.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, (recursivePlaylist(url, playlistName, playlistId))];
                        case 5:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                                    },
                                })];
                        case 6:
                            response = _d.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, (recursivePlaylist(url, playlistName, playlistId))];
                        case 7:
                            console.log("OTHER ERROR PLEASE CHECK");
                            return [2 /*return*/, []];
                        case 8: return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        var allPlaylistUrl, playlists, i, combinedPlaylistPromise, playlistIndex, combinedPlaylists, uniqueTracks, playlistIndex, songIndex, uniqueTracksArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("GETTING PLAYLIST SONGS");
                    allPlaylistUrl = 'https://api.spotify.com/v1/me/playlists?limit=50';
                    console.log(req.session["access_token"]);
                    return [4 /*yield*/, recursiveSpotify(allPlaylistUrl)
                        //Removing all playlits not created by current user
                    ];
                case 1:
                    playlists = _a.sent();
                    //Removing all playlits not created by current user
                    for (i = 0; i < playlists.length; i++) {
                        if (playlists[i].owner.id != req.session["profile_id"]) {
                            playlists.splice(i, 1);
                            i -= 1;
                        }
                    }
                    combinedPlaylistPromise = [];
                    for (playlistIndex in playlists) {
                        combinedPlaylistPromise.push(recursivePlaylist(playlists[playlistIndex].tracks.href, playlists[playlistIndex].name, playlists[playlistIndex].id));
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
function removeLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function deleteSpotify(url, songs) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_4, _a, authData, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 8]);
                            return [4 /*yield*/, axios_1.default.delete(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                    data: {
                                        ids: songs
                                    }
                                })];
                        case 1:
                            response = _b.sent();
                            console.log(response);
                            return [2 /*return*/, (response.data.items)];
                        case 2:
                            error_4 = _b.sent();
                            if (error_4.response.status == undefined) {
                                console.log(error_4);
                            }
                            _a = error_4.response.status;
                            switch (_a) {
                                case 429: return [3 /*break*/, 3];
                                case 401: return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 6];
                        case 3:
                            console.log("timeout error");
                            setTimeout(function () {
                            }, error_4.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, (deleteSpotify(url, songs))];
                        case 4:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                                    },
                                })];
                        case 5:
                            response = _b.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, (deleteSpotify(url, songs))];
                        case 6:
                            console.log("OTHER ERROR PLEASE CHECK");
                            return [2 /*return*/, []];
                        case 7: return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        }
        var url;
        return __generator(this, function (_a) {
            url = "https://api.spotify.com/v1/me/tracks";
            // let url = "https://api.spotify.com/v1/me/tracks?offset=0&limit=50&market=US"
            // let songs = req.body.songs
            console.log(req.session["access_token"]);
            while (req.body.songIds.length > 0) {
                deleteSpotify(url, req.body.songIds.splice(0, 50));
            }
            return [2 /*return*/];
        });
    });
}
exports.removeLikedSongs = removeLikedSongs;
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var profileURI;
        return __generator(this, function (_a) {
            profileURI = 'https://api.spotify.com/v1/me';
            axios_1.default.get(profileURI, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                res.send(response.data);
            });
            return [2 /*return*/];
        });
    });
}
exports.getProfile = getProfile;
function addToPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function createPlaylist(url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.post(url, playlistData, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, (response.data.id)];
                        case 2:
                            error_5 = _a.sent();
                            if (error_5.response.status == undefined) {
                                console.log(error_5);
                            }
                            switch (error_5.response.status) {
                                case 429:
                                    console.log("timeout error");
                                    setTimeout(function () {
                                    }, 5000);
                                    return [2 /*return*/, (createPlaylist(url))];
                            }
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function addToPlaylistAxios(url, playlistId, songs) {
            return __awaiter(this, void 0, void 0, function () {
                var songObj, response, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            songObj = { uris: songs };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, axios_1.default.post(url, songObj, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json"
                                    }
                                })];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, (response.data.items)];
                        case 3:
                            error_6 = _a.sent();
                            if (error_6.response.status == undefined) {
                                console.log(error_6);
                            }
                            switch (error_6.response.status) {
                                case 429:
                                    console.log("timeout error");
                                    setTimeout(function () {
                                    }, 5000);
                                    return [2 /*return*/, (addToPlaylistAxios(url, playlistId, songs))];
                            }
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var createPlaylistURL, songUris, playlistData, playlistId, addSongPlaylistURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createPlaylistURL = "https://api.spotify.com/v1/users/" + req.session["profile_id"] + "/playlists";
                    songUris = req.body.songUris;
                    console.log(req.body);
                    console.log("token  = " + req.session["access_token"]);
                    playlistData = {
                        "name": "Liked Songs Not in Playlist",
                        "description": "Liked Songs that are not in a playlist",
                        "public": false
                    };
                    console.log(songUris);
                    return [4 /*yield*/, createPlaylist(createPlaylistURL)];
                case 1:
                    playlistId = _a.sent();
                    console.log(playlistId);
                    addSongPlaylistURL = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks";
                    while (songUris.length > 0) {
                        console.log("running");
                        addToPlaylistAxios(addSongPlaylistURL, playlistId, songUris.splice(0, 100));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.addToPlaylist = addToPlaylist;
