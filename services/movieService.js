"use strict";

const mongoose = require('mongoose'),
      request  = require('request'),
      Movie    = require('../models/movie');

class movieService {

    //Search omdb database and save the data for later usage
    omdbSearch(req, res, next) {
        let title;

        //If title is not presented in req.body, inform user that title is required
        if('title' in req.body) {
            title = req.body.title;
        } else {
            return res.status(422).json({error: 'Title is required'});
        }

        let omdbRequest =  {
            qs: {
                apikey: '8d450d7b',
                t: title
            }
        };

        //Send request to OMDb for more data about the movie
        let omdbPromise = new Promise( (resolve, reject) => {

            request('http://www.omdbapi.com', omdbRequest, function (error, response, body) {

                //Reject if request failed
                if(error) {
                    console.log(error);
                    reject({error: 'Request to omdb failed'})
                }

                resolve(body);
            });
        })
            .then(body => {
                let jsonBody = JSON.parse(body);
                if(!("Title" in jsonBody))
                    res.status(404).json({error: 'Movie not found'});

                //Parsing values to match model parameters
                jsonBody.imdbVotes = 'imdbVotes' in jsonBody ? jsonBody.imdbVotes.replace(',','.') : undefined;
                jsonBody.Response = 'Response' in jsonBody ? jsonBody.Response.toLowerCase() === 'true' : undefined;

                if(process.env.NODE_ENV === 'test')
                    jsonBody._id = require('../config').testId;

                //Storing movie body for later usage
                res.locals.movie = jsonBody;
                next();
        })
            .catch(error => {
                console.log(error);
                res.status(500).json(error);
            });
    }

    //Save posted movie
    create(req, res) {
        let movieBody = res.locals.movie;
        let ratingIds = res.locals.ratingIds;

        movieBody.Ratings = ratingIds;

        Movie.create(movieBody)
            .then((data) => {

                Movie.populate(data, {path: 'Ratings'},
                    (err, data) => {
                        if(err)
                            return res.status(500).json({error: "Error populating movie"});
                        return res.status(200).json(data)
                    })

            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({error: "Error saving movie"});
            });
    }

    findAll(req, res) {

        let filter = {};
        let sort = {};
        let order = req.query.order || 1;
        if(req.query.title)
            filter.Title = {
                '$regex': req.query.title,
                '$options': 'i'
            };
        if(order !== 1) {
            order = order === 'desc' ? -1 : 11;
        }
        if(req.query.sort)
            sort[req.query.sort] = order;



        Movie.find(filter)
            .select('-__v')
            .sort(sort)
            .populate({path: 'Ratings', select:'-__v'})
            .exec((err, data) => {
                if(err)
                    return res.status(500).json({error: "Error finding movies"});
                return res.status(200).json(data);
            })
    }

}

module.exports = new movieService();