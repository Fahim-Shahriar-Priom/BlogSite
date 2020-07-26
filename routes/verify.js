const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token,'AEYjGNIRVGEtKSIarg0zCMEzOoNsKbxzzAFjTZWCrNfRaKHrOZ0gYf66cqRDcYrKFtv9Hp6J8NU3kh7xb47V4JvTGKGARAMhngqfcn7T63W7iCyvolcoaqRIw0Vi1aarol8902r5c1ss');
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}