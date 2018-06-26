const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const ratingSchema = new Schema({
    movieId: {type: Schema.Types.ObjectId, ref: 'movie'},
    Source: String,
    Value: String
});
module.exports = mongoose.model('rating', ratingSchema);