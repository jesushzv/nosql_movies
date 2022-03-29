const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    rating: {
        type: Number,
        require: true
    },
    release_year: {
        type: Number,
        require: true
    },
    box_office: {
        type: Number,
        required: false
    }
  });

  const Movie = mongoose.model("Movie", MovieSchema);

  module.exports = Movie;