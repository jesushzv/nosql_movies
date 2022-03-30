const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


//Token generation
const genToken = require('./genToken');
app.post('/auth',(req, res) => {
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
app.get('/', authToken , (req, res) => {
    res.json({
        message: 'You are authenticated',
        body: req.user
    });
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})