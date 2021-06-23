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
exports.getLikedSongs = void 0;
var axios_1 = __importDefault(require("axios"));
var querystring = require('querystring');
var redirect_uri = 'http://localhost:3000/callback';
var client_id = '300ac0b33203415b98bd63ec4146c74c';
var client_secret = 'a78fd6a2e88a4d0282c4c8724771646f';
var likedSongUri = 'https://api.spotify.com/v1/me/tracks';
//Function adds user to database then redirects user to the main page.
// export async function getLikedSongs (req:Request, res:Response) {
//     console.log("GETTING LIKED SONGS")
//     // console.log(req.query.code)
//     axios.get(likedSongUri, {
//         params: {
//             market: 'US',
//             limit: '50',
//             offset: '1'
//         },
//         headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + req.query.code,
//             "Content-Type": "application/json"
//         }
//     }).then(response =>{console.log(response)}).catch((error)=>{
//         console.log(error)
//     })
// }
function getLikedSongs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authURI;
        return __generator(this, function (_a) {
            console.log("GETTING LIKED SONGS");
            authURI = 'https://accounts.spotify.com/api/token';
            axios_1.default({
                url: authURI,
                method: 'post',
                params: {
                    grant_type: 'client_credentials'
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    username: client_id,
                    password: client_secret
                }
            }).then(function (response) { return console.log(response.data.access_token); });
            return [2 /*return*/];
        });
    });
}
exports.getLikedSongs = getLikedSongs;