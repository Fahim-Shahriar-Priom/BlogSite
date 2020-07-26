const mongoose = require('mongoose'); 

const blogsSchema = mongoose.Schema({
    
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    blogName: {
        type: String,
        required: true,
    },
    blog: {
        type: Text,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Blog', blogsSchema);