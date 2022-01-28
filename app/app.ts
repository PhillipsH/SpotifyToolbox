import express from "express";
import cors from 'cors';
import path from "path";
import authenticateRouter from './routes/authenticateRouter'
import spotifyCallRouter from './routes/spotifyCallRouter'
import session from 'express-session';
// import apiRouter from "./routes/api";
// var cookieParser = require('cookie-parser');

const app = express();
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(session({
  secret: "Shh, its a secret!",
  resave: true,
  saveUninitialized: true}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use(cookieParser());
app.use(express.static(__dirname + '/public'))
const port = 5000;
app.use(express.static(path.join(__dirname, 'public')));

// Configuring body parser middleware

app.use(express.static('../spotify-react/build'));

app.use('/spotify/', spotifyCallRouter);
app.use('/authenticate',authenticateRouter);

app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname,'../', 'spotify-react', 'build', 'index.html'))
})

// app.use('', apiRouter);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));