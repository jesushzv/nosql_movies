const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDb = require('./db');

//Database Connection
connectDb();

// Middleware
app.use(cors());
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
    res.send('MOVIES SERVICE API by jesushsv & gilbertosantana24');
});

app.use("/api", require("./routes/movieRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/login", require("./routes/loginRoutes"));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})