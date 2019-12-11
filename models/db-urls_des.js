var mongoose = require('mongoose')

var data = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
})

var contactUs = mongoose.model('urls_des', data)

module.exports = contactUs