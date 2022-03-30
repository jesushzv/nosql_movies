const router = require('express').Router();
const Movie = require('./model');

//GET MOVIES
router.get('/all', async (req,res)=> {
    const movies = await Movie.findAll();
    res.send(movies)
})

//POST MOVIE
router.post('/', async (req,res)=> {
    const movie = await Movie.create({
        name: req.body.name,
        rating: req.body.rating,
        releaseYear: req.body.releaste_year,
        boxOffice: req.body.boxOffice
    });

    res.send(movie);
})

//UPDATE A MOVIE
router.put('/', async (req,res)=>{

    Movie.update({
        name: req.body.name,
        rating: req.body.rating,
        release_year: req.body.release_year,
        box_office: req.body.box_office
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