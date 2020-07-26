const express = require('express');
const Blogs = require('../dbModels/blogs');
const User = require('../dbModels/users');
const verify = require('./verify');

const router = express.Router();

router.get('/getByUserId',verify,async(req,res) => {
    try{
        var query = { address: req.body.userId };
        const allblogs = await Blogs.find(query);
        res.json(allblogs);
    }catch(err){
        res.json({messagee : err});
    }
});

router.post('/post',verify,async (req,res) => {
    const blogs = new Blogs({
        userId : req.body.userId,
        userName : req.body.userName,
        blogName : req.body.blogName,
        blog : req.body.blog
    });
    try{
        const saveBlogs = await blogs.save();
        res.json(saveBlogs);
    }catch(err){
        res.json({messagee : err});
    }
});

router.get('/get/:blogId',verify,async(req,res) => {
    try{
        const blog = await Blogs.findById(req.params.blogId);
        res.json(blog);
    }catch(err){
        res.json({messagee : err});
    }
});

router.patch('/update/:blogId',verify,async(req,res) => {
    try{
        const blogUpdate = await Blogs.updateOne({_id : req.params.blogId},{ $set : {blog: req.body.blog , blogName: req.body.blogName}});
        res.json(blogUpdate);
    }catch(err){
        res.json({messagee : err});
    }
});

router.delete('/delete/:blogId',verify,async(req,res) => {
    try{
        const blogDelete = await Blogs.remove({_id : req.params.blogId});
        res.json(blogDelete);
    }catch(err){
        res.json({messagee : err});
    }
});

module.exports = router;