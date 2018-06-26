"use strict";

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

let commentSchema = new Schema({
    movieId: {type: Schema.Types.ObjectId, ref: 'movie', required: true},
    body: {type: String, required: true}
});

module.exports = mongoose.model('comment', commentSchema);