const Movie = require('./model');
const connectDb = require('./db');
connectDb()
const createMovie = async () =>{
    const movie = await Movie.create({
        name: 'The Godfather',
        rating: 9.2,
        release_year: 1972,
        box_office: 120000000
    });
    await movie.save((err, movie) => {
        if(err){
            console.error(err)}
        else{
            console.log(movie);

        }
    });
}

createMovie();
