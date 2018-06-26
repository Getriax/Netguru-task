"use strict";

const movieService  = require('../../services/movieService'),
      ratingService = require('../../services/ratingService');

class Movie {
    constructor(router) {

        router.get('/',
            movieService.findAll.bind(this) //Find all movies
        );
        //- /movies post request
        router.post('/',
            movieService.omdbSearch.bind(this), //Serch omdb database for the movie with title
            ratingService.create.bind(this), //Save ratings of the movie
            movieService.create.bind(this) //Save movie and return it
        );

    }
}

module.exports = Movie;