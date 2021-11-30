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
exports.top = exports.addSongsToPlaylist = exports.createPlaylist = exports.addLikedSongs = exports.removeLikedSongs = exports.getProfile = exports.getGenre = exports.getPlaylistSongs = exports.getLikedSongs = void 0;
var axios_1 = __importDefault(require("axios"));
require("dotenv").config();
var redirect_uri = "http://localhost:3000/callback";
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var refreshTokenUri = "https://accounts.spotify.com/api/token";
//Function adds user to database then redirects user to the main page.
function getLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function spotifyApiCall(url, offset) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1, _a, authData, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 11]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                    params: {
                                        limit: 50,
                                        market: "US",
                                        offset: offset,
                                    },
                                })];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/, response.data];
                        case 2:
                            error_1 = _b.sent();
                            if (!(error_1.response.status != undefined)) return [3 /*break*/, 9];
                            _a = error_1.response.status;
                            switch (_a) {
                                case 429: return [3 /*break*/, 3];
                                case 503: return [3 /*break*/, 4];
                                case 401: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 3:
                            console.log("timeout error");
                            setTimeout(function () { }, error_1.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, spotifyApiCall(url, offset)];
                        case 4:
                            console.log("timeout error");
                            setTimeout(function () { }, 5000);
                            return [2 /*return*/, spotifyApiCall(url, offset)];
                        case 5:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                    },
                                })];
                        case 6:
                            response = _b.sent();
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, spotifyApiCall(url, offset)];
                        case 7:
                            console.log("OTHER ERROR PLEASE CHECK LIKED");
                            console.log(error_1.response.status);
                            return [2 /*return*/, []];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            console.log("error");
                            _b.label = 10;
                        case 10: return [3 /*break*/, 11];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        }
        var LIKED_SONGS_URI, initialCall, promiseArr, i, songApiArr, totalLikedSongs, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LIKED_SONGS_URI = "https://api.spotify.com/v1/me/tracks";
                    console.log("GETTING LIKED SONGS");
                    return [4 /*yield*/, spotifyApiCall(LIKED_SONGS_URI, 0)];
                case 1:
                    initialCall = _a.sent();
                    promiseArr = [];
                    for (i = 50; i < initialCall.total; i += 50) {
                        promiseArr.push(spotifyApiCall(LIKED_SONGS_URI, i));
                    }
                    return [4 /*yield*/, Promise.all(promiseArr)];
                case 2:
                    songApiArr = _a.sent();
                    totalLikedSongs = [];
                    totalLikedSongs = totalLikedSongs.concat(initialCall.items);
                    for (i in songApiArr) {
                        totalLikedSongs = totalLikedSongs.concat(songApiArr[i].items);
                    }
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
                            _d.trys.push([0, 3, , 10]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                })];
                        case 1:
                            response = _d.sent();
                            if (response.data.next == null) {
                                return [2 /*return*/, response.data.items];
                            }
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, recursiveSpotify(response.data.next)];
                        case 2: return [2 /*return*/, _b.apply(_a, [_d.sent()])];
                        case 3:
                            error_2 = _d.sent();
                            if (error_2.response.status == undefined) {
                                // console.log(error)
                            }
                            _c = error_2.response.status;
                            switch (_c) {
                                case 429: return [3 /*break*/, 4];
                                case 503: return [3 /*break*/, 5];
                                case 401: return [3 /*break*/, 6];
                            }
                            return [3 /*break*/, 8];
                        case 4:
                            console.log("timeout error");
                            setTimeout(function () { }, 5000);
                            return [2 /*return*/, recursiveSpotify(url)];
                        case 5:
                            console.log("timeout error");
                            setTimeout(function () { }, 5000);
                            return [2 /*return*/, recursiveSpotify(url)];
                        case 6:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                        "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                })];
                        case 7:
                            response = _d.sent();
                            console.log("ERROR 401");
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, recursiveSpotify(url)];
                        case 8:
                            console.log("OTHER ERROR PLEASE CHECK Playlist");
                            console.log(error_2.response.status);
                            return [2 /*return*/, []];
                        case 9: return [3 /*break*/, 10];
                        case 10: return [2 /*return*/];
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
                            _d.trys.push([0, 3, , 10]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
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
                            _b = (_a = response.data.items).concat;
                            return [4 /*yield*/, recursivePlaylist(response.data.next, playlistName, playlistId)];
                        case 2: 
                        // console.log(response.data.next)
                        return [2 /*return*/, _b.apply(_a, [_d.sent()])];
                        case 3:
                            error_3 = _d.sent();
                            if (error_3.response.status == undefined) {
                                console.log(error_3);
                            }
                            _c = error_3.response.status;
                            switch (_c) {
                                case 429: return [3 /*break*/, 4];
                                case 503: return [3 /*break*/, 5];
                                case 401: return [3 /*break*/, 6];
                            }
                            return [3 /*break*/, 8];
                        case 4:
                            setTimeout(function () { }, error_3.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, recursivePlaylist(url, playlistName, playlistId)];
                        case 5:
                            setTimeout(function () { }, 5000);
                            return [2 /*return*/, recursivePlaylist(url, playlistName, playlistId)];
                        case 6:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                    },
                                })];
                        case 7:
                            response = _d.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, recursivePlaylist(url, playlistName, playlistId)];
                        case 8:
                            console.log("OTHER ERROR PLEASE CHECK PLAYLIST 2");
                            console.log(error_3.response.status);
                            return [2 /*return*/, []];
                        case 9: return [3 /*break*/, 10];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        }
        var allPlaylistUrl, playlists, i, combinedPlaylistPromise, playlistIndex, combinedPlaylists, uniqueTracks, playlistIndex, songIndex, uniqueTracksArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("GETTING PLAYLIST SONGS");
                    allPlaylistUrl = "https://api.spotify.com/v1/me/playlists?limit=50";
                    return [4 /*yield*/, recursiveSpotify(allPlaylistUrl)];
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
                    return [4 /*yield*/, Promise.all(combinedPlaylistPromise)];
                case 2:
                    combinedPlaylists = _a.sent();
                    uniqueTracks = {};
                    for (playlistIndex in combinedPlaylists) {
                        for (songIndex in combinedPlaylists[playlistIndex]) {
                            try {
                                uniqueTracks[combinedPlaylists[playlistIndex][songIndex].track.id] =
                                    combinedPlaylists[playlistIndex][songIndex];
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
function getGenre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        // const API_KEY = '57ee3318536b23ee81d6b27e36997cde'
        function addGenre(idsString) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_4, _a, authData, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 9]);
                            return [4 /*yield*/, axios_1.default.get(GENRE_API, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                    params: {
                                        ids: idsString,
                                    },
                                })];
                        case 1:
                            response = _b.sent();
                            if (response.data.error != undefined)
                                throw response;
                            return [2 /*return*/, response.data];
                        case 2:
                            error_4 = _b.sent();
                            if (error_4.response.status == undefined) {
                                console.log(error_4);
                            }
                            _a = error_4.response.status;
                            switch (_a) {
                                case 429: return [3 /*break*/, 3];
                                case 503: return [3 /*break*/, 4];
                                case 401: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 3:
                            setTimeout(function () { }, error_4.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, addGenre(idsString)];
                        case 4:
                            setTimeout(function () { }, error_4.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, addGenre(idsString)];
                        case 5:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                    },
                                })];
                        case 6:
                            response = _b.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, addGenre(idsString)];
                        case 7:
                            console.log("OTHER ERROR PLEASE CHECK");
                            console.log(error_4.response.status);
                            return [2 /*return*/, []];
                        case 8: return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        var GENRE_API, artists, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    GENRE_API = "https://api.spotify.com/v1/artists";
                    if (req.query.artists == undefined)
                        throw "undefined";
                    if (!Array.isArray(req.query.artists))
                        throw "sent data is not an array";
                    artists = req.query.artists;
                    if (artists > 50)
                        throw "songList is too large";
                    _b = (_a = res).send;
                    return [4 /*yield*/, addGenre(artists.toString())];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getGenre = getGenre;
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var profileURI;
        return __generator(this, function (_a) {
            profileURI = "https://api.spotify.com/v1/me";
            axios_1.default
                .get(profileURI, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.session["access_token"],
                    "Content-Type": "application/json",
                },
            })
                .then(function (response) {
                res.send(response.data);
            });
            return [2 /*return*/];
        });
    });
}
exports.getProfile = getProfile;
function removeLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function deleteSpotify(url, songs) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_5, _a, authData, response;
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
                                        ids: songs,
                                    },
                                })];
                        case 1:
                            response = _b.sent();
                            console.log(response);
                            return [2 /*return*/, response.data.items];
                        case 2:
                            error_5 = _b.sent();
                            if (error_5.response.status == undefined) {
                                console.log(error_5);
                            }
                            _a = error_5.response.status;
                            switch (_a) {
                                case 429: return [3 /*break*/, 3];
                                case 401: return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 6];
                        case 3:
                            console.log("timeout error");
                            setTimeout(function () { }, error_5.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, deleteSpotify(url, songs)];
                        case 4:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                    },
                                })];
                        case 5:
                            response = _b.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, deleteSpotify(url, songs)];
                        case 6:
                            console.log("OTHER ERROR PLEASE CHECK");
                            console.log(error_5.response.status);
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
            console.log(req.session["access_token"]);
            while (req.body.songIds.length > 0) {
                deleteSpotify(url, req.body.songIds.splice(0, 50));
            }
            return [2 /*return*/];
        });
    });
}
exports.removeLikedSongs = removeLikedSongs;
function addLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function addLikedSongsCall(url, songs) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_6, _a, authData, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 8]);
                            return [4 /*yield*/, axios_1.default.put(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                    data: {
                                        ids: songs,
                                    },
                                })];
                        case 1:
                            response = _b.sent();
                            console.log(response);
                            return [2 /*return*/, response.data.items];
                        case 2:
                            error_6 = _b.sent();
                            if (error_6.response.status == undefined) {
                                console.log(error_6);
                            }
                            _a = error_6.response.status;
                            switch (_a) {
                                case 429: return [3 /*break*/, 3];
                                case 401: return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 6];
                        case 3:
                            console.log("timeout error");
                            setTimeout(function () { }, error_6.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, addLikedSongsCall(url, songs)];
                        case 4:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                    },
                                })];
                        case 5:
                            response = _b.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, addLikedSongsCall(url, songs)];
                        case 6:
                            console.log("OTHER ERROR" + error_6.response.status);
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
            while (req.body.songIds.length > 0) {
                addLikedSongsCall(url, req.body.songIds.splice(0, 50));
            }
            return [2 /*return*/];
        });
    });
}
exports.addLikedSongs = addLikedSongs;
function createPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function getPlaylistId(url) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_7, _a, authData, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 8]);
                            return [4 /*yield*/, axios_1.default.post(url, playlistDetails, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                })];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/, response.data.id];
                        case 2:
                            error_7 = _b.sent();
                            if (error_7.response.status == undefined) {
                                console.log(error_7);
                            }
                            _a = error_7.response.status;
                            switch (_a) {
                                case 429: return [3 /*break*/, 3];
                                case 401: return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 6];
                        case 3:
                            console.log("timeout error");
                            setTimeout(function () { }, error_7.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, getPlaylistId(url)];
                        case 4:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                    },
                                })];
                        case 5:
                            response = _b.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, getPlaylistId(url)];
                        case 6:
                            console.log("OTHER ERROR PLEASE CHECK");
                            console.log(error_7.response.status);
                            return [2 /*return*/, []];
                        case 7: return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        }
        var createPlaylistURL, playlistDetails, playlistId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createPlaylistURL = "https://api.spotify.com/v1/users/" +
                        req.session["profile_id"] +
                        "/playlists";
                    playlistDetails = req.body.playlistDetails;
                    console.log(playlistDetails);
                    return [4 /*yield*/, getPlaylistId(createPlaylistURL)];
                case 1:
                    playlistId = _a.sent();
                    res.send(playlistId);
                    return [2 /*return*/];
            }
        });
    });
}
exports.createPlaylist = createPlaylist;
function addSongsToPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function addToPlaylistCall(url, songs) {
            return __awaiter(this, void 0, void 0, function () {
                var songObj, response, error_8, _a, authData, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            songObj = { uris: songs };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 9]);
                            return [4 /*yield*/, axios_1.default.post(url, songObj, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                })];
                        case 2:
                            response = _b.sent();
                            return [2 /*return*/, response.data.items];
                        case 3:
                            error_8 = _b.sent();
                            if (error_8.response.status == undefined) {
                                console.log(error_8);
                            }
                            _a = error_8.response.status;
                            switch (_a) {
                                case 429: return [3 /*break*/, 4];
                                case 401: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 7];
                        case 4:
                            console.log("timeout error");
                            setTimeout(function () { }, error_8.response.headers["retry-after"] * 1000);
                            return [2 /*return*/, addToPlaylistCall(url, songs)];
                        case 5:
                            authData = {
                                grant_type: "refresh_token",
                                refresh_token: req.session["refresh_token"],
                            };
                            return [4 /*yield*/, axios_1.default.post(refreshTokenUri, authData, {
                                    headers: {
                                        Authorization: "Basic " +
                                            new Buffer(client_id + ":" + client_secret).toString("base64"),
                                    },
                                })];
                        case 6:
                            response = _b.sent();
                            console.log(response);
                            req.session["access_token"] = response.data.access_token;
                            return [2 /*return*/, addToPlaylistCall(url, songs)];
                        case 7:
                            console.log("OTHER ERROR PLEASE CHECK");
                            console.log(error_8.response.status);
                            return [2 /*return*/, []];
                        case 8: return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        var playlistId, songUris, addSongPlaylistURL;
        return __generator(this, function (_a) {
            playlistId = req.body.playlistId;
            songUris = req.body.songUris;
            addSongPlaylistURL = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks";
            while (songUris.length > 0) {
                addToPlaylistCall(addSongPlaylistURL, songUris.splice(0, 100));
            }
            return [2 /*return*/];
        });
    });
}
exports.addSongsToPlaylist = addSongsToPlaylist;
function top(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        // console.log(req.body)
        function topCall() {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: {
                                        Accept: "application/json",
                                        Authorization: "Bearer " + req.session["access_token"],
                                        "Content-Type": "application/json",
                                    },
                                    params: {
                                        limit: 50,
                                        time_range: rankTime,
                                    },
                                })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.data];
                        case 2:
                            error_9 = _a.sent();
                            console.log(error_9);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var rankType, rankTime, url, topObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rankType = req.query.rankType;
                    rankTime = req.query.rankTime;
                    url = "https://api.spotify.com/v1/me/top/" + rankType;
                    return [4 /*yield*/, topCall()];
                case 1:
                    topObj = _a.sent();
                    console.log(topObj);
                    res.send(topObj.items);
                    return [2 /*return*/];
            }
        });
    });
}
exports.top = top;
