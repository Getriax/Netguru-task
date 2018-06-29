"use strict";
const Comment  = require('../models/comment');

class commentService {

    //creates a comment with a specified movie id
    create(req, res) {
        let commentBody = req.body;

        //Check if body and movieId are specified
        if(!('body' in req.body && 'movieId' in req.body))
            return res.status(422).json({error: "Comment requires body and movieId properties"});

        Comment.create(commentBody)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({error: "Could not save comment"})
            })
    }

    //Optional id of the movie
    findAll(req, res) {
        let query = {};
        if(req.params.id)
            query.movieId = req.params.id;

        Comment.find(query)
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({error: "Could not find comments"})
            })
    }

}

module.exports = new commentService();