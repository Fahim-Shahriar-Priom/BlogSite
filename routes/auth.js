const express = require('express');
const User = require('../dbModels/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation , loginValidation } = require('../routes/validation');

const router = express.Router();

router.post('/register',async (req,res) => {
    
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const previousEmail = await User.findOne({ email : req.body.email});
    if(previousEmail) return res.status(400).send('already have a account for this email');

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name : req.body.name,
        type : req.body.type,
        email : req.body.email,
        password : hashedPassword
    });
    try{
        const saveUser = await user.save();
        res.send({user : user.name});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async (req,res) => {
    
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const previousEmail = await User.findOne({ email : req.body.email});
    if(!previousEmail) return res.status(400).send('email not found');

    const passwordValidation = await bcrypt.compare(req.body.password, previousEmail.password);
    if(!passwordValidation) return res.status(400).send('Invalid Password');

    const token = jwt.sign({_id : user._id},'AEYjGNIRVGEtKSIarg0zCMEzOoNsKbxzzAFjTZWCrNfRaKHrOZ0gYf66cqRDcYrKFtv9Hp6J8NU3kh7xb47V4JvTGKGARAMhngqfcn7T63W7iCyvolcoaqRIw0Vi1aarol8902r5c1ss');
    res.header('auth-token',token).send(token);
    res.send('Login Successful');
});

router.patch('/reportUser/:commenterId',async(req,res) => {
    
    const userInfo = await User.findOne({ _id : req.body.bloggerId});
    if(!userInfo) return res.status(400).send('User Not Found');
    if(userInfo.type !== 'blogger') return res.status(400).send('User is not a blogger');

    var data = 'reported';

    const reportInfo = await User.findOne({ _id : req.body.bloggerId});
    if(!reportInfo.bloreportUserOne){
        var value = bloreportUserOne;
    }
    else{
        var value = bloreportUserTwo;
    }

    try{
        const reportUpdate = await User.updateOne({_id : req.params.commenterId},{ $set : {value: data}});
        res.json(reportUpdate);
    }catch(err){
        res.json({messagee : err});
    }
});


module.exports = router;