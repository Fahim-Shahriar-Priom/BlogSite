const mongoose = require('mongoose'); 

const usersSchema = mongoose.Schema({
    
    // userId: {
    //     type: String,
    //     required: true,
    // },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    BanUser: {
        type : Boolean,
        default : false
    },
    reportUserOne : String,
    reportUserTwo : String,
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', usersSchema);