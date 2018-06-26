"use strict";

const mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let movieSchema = new Schema({
    Title: {type: String, required: true},
    Year: Number,
    Rated: String,
    Released: Date,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings: [{type: Schema.Types.ObjectId, ref: 'rating', required: true}],
    Metascore: Number,
    imdbRating: Number,
    imdbVotes: Number,
    imdbID: String,
    Type: String,
    DVD: Date,
    BoxOffice: String,
    Production: String,
    Website: String,
    Response: Boolean
});

module.exports = mongoose.model('movie', movieSchema);