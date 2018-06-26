const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

let commentSchema = new Schema({
    movieId: {type: Schema.Types.ObjectId, ref: 'movie'},
    body: {type: String, required: true}
});