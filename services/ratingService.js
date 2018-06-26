"use strict";

const Rating   = require('../models/rating'),
      mongoose = require('mongoose');

class ratingService {

    //Save ratings for the specified movie
    create(req, res, next) {

        if(!('Ratings' in  res.locals.movie))
            return next();

        let ratings = res.locals.movie.Ratings;
        let ratingIds = [];

        if(ratings instanceof Array) {

            //Assign id to each rating object
            ratings = ratings.map(r => {
                r._id = new mongoose.Types.ObjectId();
                ratingIds.push(r._id);
                return r;
            });


            Rating.insertMany(ratings)
                .then(() => {
                    res.locals.ratingIds = ratingIds;
                    next();
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({error: 'Could not save the rating'})
                });

        } else {
            //Assign id of the movie to ratings object
            ratings._id = new mongoose.Types.ObjectId();
            ratingIds.push(ratings._id);

            Rating.crate(ratings)
                .then(() => {
                    res.locals.ratingIds = ratingIds;
                    next();
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({error: 'Could not save the rating'})
                });
        }
    }

}

module.exports = new ratingService();