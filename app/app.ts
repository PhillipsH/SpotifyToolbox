import express from "express";
import cors from 'cors';
import path from "path";

// import apiRouter from "./routes/api";
import authenticateRouter from './routes/authenticateRouter'
import spotifyCallRouter from './routes/spotifyCallRouter'
var cookieParser = require('cookie-parser');

const app = express();
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(cookieParser());
const port = 5000;
app.use(express.static(path.join(__dirname, 'public')));

// Configuring body parser middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('../spotify-react/build'));

app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname,'../', 'spotify-react', 'build', 'index.html'))
})

// app.use('', apiRouter);
app.use('/spotify/', spotifyCallRouter);
app.use('/authenticate',authenticateRouter);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));