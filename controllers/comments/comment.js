"use strict";

const commentService = require('../../services/commentService');

class Comment {
    constructor(router) {

        router.get('/',
            commentService.findAll.bind(this)
        );
        router.get('/:id',
                commentService.findAll.bind(this)
            );
        router.post('/',
                commentService.create.bind(this)
            );
    }
}

module.exports = Comment;