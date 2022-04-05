const router = require("express").Router();
const Movie = require("./model");

//GET MOVIES
router.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

//POST MOVIE
router.post("/movies", async (req, res) => {
  session = req.session;
  if (!session.user) {
    res.status(401).json({
      message: "You must be logged in to add a movie",
    });
  } else {
    const movie = await Movie.create({
      name: req.body.name,
      rating: req.body.rating,
      releaseYear: req.body.releaste_year,
      boxOffice: req.body.boxOffice,
    });

    if (Movie.findOne({ name: req.body.name })) {
      res.status(400).send("Movie already exists");
    } else {
      movie.save();
      res.send(movie);
    }
  }
});

//UPDATE A MOVIE
router.put("/movies", async (req, res) => {
  Movie.updateOne(
    {
      name: req.body.name,
      rating: req.body.rating,
      release_year: req.body.release_year,
      box_office: req.body.box_office,
    },
    {
      where: {
        id: req.body.id,
      },
      returning: true,
      plain: true,
    }
  ).then(function (result) {
    res.send(result[1].dataValues);
  });
});

module.exports = router;
