const mongoose = require('mongoose'); 

const commentsSchema = mongoose.Schema({
    
    bloggerId: {
        type: String,
        required: true,
    },
    commenterId: {
        type: String,
        required: true,
    },
    blogId: {
        type: String,
        required: true,
    },
    parentCommentIdOne: String,
    parentCommentIdTwo: String,
    parentCommentIdThree: String,
    comment: {
        type: String,
        required: true,
    },
    markComment: {
        type: Boolean,
        default : false
    },
    stopComment: {
        type: Boolean,
        default : false
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Comment', commentsSchema);