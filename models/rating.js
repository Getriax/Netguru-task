"use strict";

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const ratingSchema = new Schema({
    Source: String,
    Value: String
});
module.exports = mongoose.model('rating', ratingSchema);