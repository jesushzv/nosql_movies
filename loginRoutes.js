const router = require('express').Router();
const User = require('./userModel');

router.get('/get', (req, res) => {

    if(req.session.user){
        res.send(req.session.user);

    }
    else{

    const user = User.findOne({
        username: req.body.username
    });

    if(user){
        if (user.password === req.body.password) {
            res.send(user);
        }
        else {
            res.status(400).send("Wrong password");
        }
    }
    
    else{
        res.status(400).send("User does not exist")
    }
}
})


module.exports = router;