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
        type: String
    }
})

var contactUs = mongoose.model('contactUs', data)

module.exports = contactUs