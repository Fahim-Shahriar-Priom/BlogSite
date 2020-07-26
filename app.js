const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');
const commentRouter = require('./routes/comment');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/auth',authRouter);
app.use('/blogs',blogRouter);
app.use('/comments',commentRouter);

// app.get('/',(req,res) => {
//     res.send('welcome');
// })

mongoose.connect('mongodb://fahim:fahim@localhost:27017/TruckLagbeAnalytics',
{ useNewUrlParser: true },() => {
    console.log('Connected to mongoDB');
});

app.listen(3000, () => {
    console.log('app listening at port %s', 3000);
});