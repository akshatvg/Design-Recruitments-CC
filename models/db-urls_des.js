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
    regno: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    date:{
        type:Date
    }
})

var urls_des = mongoose.model('urls_des', data)

module.exports = urls_des