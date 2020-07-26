const express = require('express');
const Comments = require('../dbModels/comments');
const User = require('../dbModels/users');
const verify = require('./verify');

const router = express.Router();

router.get('/getByBlogger',verify,async(req,res) => {
    try{
        var query = { address: req.body.bloggerId };
        const allComments = await Comments.find(query);
        res.json(allComments);
    }catch(err){
        res.json({messagee : err});
    }
});

router.get('/getByBlogId',verify,async(req,res) => {
    try{
        var query = { address: req.body.blogId };
        const allComments = await Comments.find(query);
        res.json(allComments);
    }catch(err){
        res.json({messagee : err});
    }
});

router.post('/post',verify,async (req,res) => {
    var data = {};
    if(req.body.parentCommentIdOne){
        data.parentCommentIdOne =  req.body.parentCommentIdOne;
    }
    else{
        data.parentCommentIdOne =  'Nothing';
    }
    if(req.body.parentCommentIdTwo){
        data.parentCommentIdTwo =  req.body.parentCommentIdTwo;
    }
    else{
        data.parentCommentIdTwo =  'Nothing';
    }
    if(req.body.parentCommentIdThree){
        data.parentCommentIdThree =  req.body.parentCommentIdThree;
    }
    else{
        data.parentCommentIdThree =  'Nothing';
    }
    const comments = new Comments({
        bloggerId : req.body.bloggerId,
        commenterId : req.body.commenterId,
        blogId : req.body.blogId,
        comment : req.body.comment,
        parentCommentIdOne : data.parentCommentIdOne,
        parentCommentIdTwo : data.parentCommentIdTwo,
        parentCommentIdThree : data.parentCommentIdThree,
        markComment : req.body.markComment
    });

    const stopInfo = await User.findOne({ _id : req.body.commentId});
    if(stopInfo.stopComment === true) return res.status(400).send('You can not comment in this comment');

    const stopComment = await User.findOne({ _id : req.body.commentId});
    if(stopComment.parentCommentIdThree !== 'Nothing') return res.status(400).send('This comment already have three nested comment');

    const stopCommentByReport = await User.findOne({ _id : req.body.commentId});
    if(stopCommentByReport.reportUserTwo === 'reported') return res.status(400).send('This commentetor is banded');

    try{
        const saveComments = await comments.save();
        res.json(saveComments);
    }catch(err){
        res.json({messagee : err});
    }
});

router.get('/get/:commentId',verify,async(req,res) => {
    try{
        const comment = await Comments.findById(req.params.commentId);
        res.json(comment);
    }catch(err){
        res.json({messagee : err});
    }
});

router.patch('/update/:commentId',verify,async(req,res) => {
    try{
        const commentUpdate = await Comments.updateOne({_id : req.params.commentId},{ $set : {comment: req.body.comment}});
        res.json(commentUpdate);
    }catch(err){
        res.json({messagee : err});
    }
});

router.delete('/delete/:commentId',async(req,res) => {
    try{
        const commentDelete = await Comments.remove({_id : req.params.commentId});
        res.json(commentDelete);
    }catch(err){
        res.json({messagee : err});
    }
});

router.patch('/updateMarkStatus/:commentId',verify,async(req,res) => {
    try{
        const commentUpdate = await Comments.updateOne({_id : req.params.commentId},{ $set : {markComment: req.body.markComment}});
        res.json(commentUpdate);
    }catch(err){
        res.json({messagee : err});
    }
});

router.delete('/deleteAllComments',verify,async(req,res) => {
    
    const userInfo = await User.findOne({ _id : req.body.bloggerId});
    if(!userInfo) return res.status(400).send('User Not Found');
    if(userInfo.type !== 'blogger') return res.status(400).send('User is not a blogger');

    try{
        const commentsDelete = await Comments.deleteMany({blogId : req.body.blogId , commenterId : req.body.commenterId});
        res.json(commentsDelete);
    }catch(err){
        res.json({messagee : err});
    }
});

router.patch('/stopComment/:commentId',verify,async(req,res) => {
    
    const userInfo = await User.findOne({ _id : req.body.bloggerId});
    if(!userInfo) return res.status(400).send('User Not Found');
    if(userInfo.type !== 'blogger') return res.status(400).send('User is not a blogger');

    try{
        const commentUpdate = await Comments.updateOne({_id : req.params.commentId},{ $set : {stopComment: req.body.stopComment}});
        res.json(commentUpdate);
    }catch(err){
        res.json({messagee : err});
    }
});

module.exports = router;