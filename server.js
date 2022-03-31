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
    secret: 'secret',
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }  ,
    resave: false
}));


//Token generation
const genToken = require('./genToken');
app.post('/token',(req, res) => {
    const { username, password } = req.body;
    const user = {username: username, password: password};
    const token = genToken(user)
    res.header('authorization', token).json({
        message: 'Token generated',
        token: token
    });
})

// Token validation
const authToken = require('./authToken');
app.get('/validate', authToken , (req, res) => {
    res.json({
        message: 'You are authenticated',
        body: req.user
    });
})

// Create session
app.get('/',(req, res) => {
    session = req.session;
})

// Destroy session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({
        message: 'Logged out'
    });
    res.redirect('/');
})

app.use("/api", require("./routes"));
app.use("/users", require("./userRoutes"));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})