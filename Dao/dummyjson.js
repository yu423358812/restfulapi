var mongoose = require('mongoose');
var eventschema = mongoose.Schema(

    {

        name: String,

        description: String,

        date: String,

        location: String,

        time: String

    }

);

module.exports = mongoose.model('event', eventschema,'event');