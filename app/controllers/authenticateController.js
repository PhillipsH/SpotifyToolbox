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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.getTokens = exports.authenticateUser = void 0;
var axios = require("axios");
var redirect_uri = 'http://localhost:5000/authenticate/getTokens';
var client_id = '300ac0b33203415b98bd63ec4146c74c';
var client_secret = 'a78fd6a2e88a4d0282c4c8724771646f';
var querystring = require('querystring');
//Function adds user to database then redirects user to the main page.
function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var scope;
        return __generator(this, function (_a) {
            console.log("AUTHENTICATE USER");
            scope = 'user-library-read user-library-modify playlist-read-private playlist-modify-private playlist-modify-public user-read-private user-read-email';
            res.redirect('https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                    response_type: 'code',
                    client_id: client_id,
                    scope: scope,
                    redirect_uri: redirect_uri,
                }));
            return [2 /*return*/];
        });
    });
}
exports.authenticateUser = authenticateUser;
function getTokens(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authURI;
        return __generator(this, function (_a) {
            authURI = 'https://accounts.spotify.com/api/token';
            console.log("GETTING TOKENS");
            axios({
                url: authURI,
                method: 'post',
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                params: {
                    grant_type: 'authorization_code',
                    code: req.query.code,
                    redirect_uri: redirect_uri
                }
            }).then(function (response) {
                req.session["code"] = req.query.code;
                req.session["access_token"] = response.data.access_token;
                req.session.cookie.maxAge = parseInt(response.data.expires_in) * 1000;
                res.redirect('http://localhost:3000/');
            }).catch(function (error) {
                console.log(error);
            });
            return [2 /*return*/];
        });
    });
}
exports.getTokens = getTokens;
function checkAuth(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("CHECK AUTH");
            if (req.session["access_token"] != undefined) {
                res.send({ "isAuthenticated": true });
            }
            else {
                res.send({ "isAuthenticated": false });
            }
            return [2 /*return*/];
        });
    });
}
exports.checkAuth = checkAuth;
