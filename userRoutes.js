const router = require('express').Router();
const User = require('./userModel');

//GET USERS
router.get('/users', async (req,res)=> {
    const user = await User.find();
    res.send(user)
})

//GET USERS BY ID
router.get('/:id', async (req,res)=> {
    const user = await User.findById();
    res.send(user);
})


//CREATE USER
router.post('/createUser', async (req,res)=> {
    const movie = await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    res.send(movie);
})

//UPDATE A USER
router.put('/updateUser', async (req,res)=>{

    User.update({
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