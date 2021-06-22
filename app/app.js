"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
// import apiRouter from "./routes/api";
var authenticateRouter_1 = __importDefault(require("./routes/authenticateRouter"));
var spotifyCallRouter_1 = __importDefault(require("./routes/spotifyCallRouter"));
var cookieParser = require('cookie-parser');
var app = express_1.default();
app.use(express_1.default.static(__dirname + '/public'));
app.use(cors_1.default());
app.use(cookieParser());
var port = 5000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Configuring body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static('../spotify-react/build'));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, '../', 'spotify-react', 'build', 'index.html'));
});
// app.use('', apiRouter);
app.use('/spotify/', spotifyCallRouter_1.default);
app.use('/authenticate', authenticateRouter_1.default);
app.listen(port, function () { return console.log("Hello world app listening on port " + port + "!"); });
