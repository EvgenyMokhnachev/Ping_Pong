var mongoose = require('mongoose');
var utcNow = require('utc-now');

var User = mongoose.Schema({
    email: String,
    password: String,
    registered: {
        type: Date,
        default: utcNow()
    }
});

module.exports = mongoose.model('User', User);