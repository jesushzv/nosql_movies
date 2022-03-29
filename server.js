const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})