var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    name: String,
    img: String,
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema)