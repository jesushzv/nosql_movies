const router = require('express').Router();
const User = require('../models/userModel');

//GET USERS
router.get('/getAll', async (req,res)=> {
    if (req.session.user === "admin") {

        const user = await User.find();
        res.send(user)
    }
    else{
        res.status(401).send("You are not authorized to view this page")
    }
})

//GET USERS BY ID
router.get('/:id', async (req,res)=> {

    if(req.session.user === "admin"){
        const user = await User.findById(req.params.id);
        res.send(user);

    }
    else{
        res.status(401).send("You are not authorized to view this page")
    }

})


//CREATE USER
router.post('/createUser', async (req,res)=> {

    const user = await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    if(User.findOne({email: req.body.email} || User.findOne({username: req.body.username}))){
        res.status(400).send("User already exists")
    }
    else{
        user.save();
        req.session.user = user;
        res.send(user);
    }
})

//UPDATE A USER
router.put('/updateUser', async (req,res)=>{

    User.updateOne({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },
    {
        where: {
            id: req.body.id
        },
        returning: true,
        plain: true
    }).then(function(result) {
        res.send(result[1].dataValues);
    })
    })



    module.exports = router;