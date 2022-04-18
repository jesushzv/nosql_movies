const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDb = require('./db');
var multer = require('multer');

//Multer Config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});

//Database Connection
connectDb();

// Middleware
app.use(cors());

var allowCrossDomain = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }  ,
    resave: false
}));

// Index
app.get('/', (req, res) => {
    res.send('MOVIES SERVICE API by jesushzv & gilbertosantana24');
});

app.use("/movies", require("./routes/movieRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/log", require("./routes/loginRoutes"));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})