const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB
const db = require('./config/keys').mongoURI;

mongoose.connect(db,{ useNewUrlParser: true })
        .then(()=> console.log('Mongodb connected'))
        .catch(err => console.log(err))

const port = process.env.PORT || 5000;

//Passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

app.listen(port, ()=>{
    console.log("server is running on port"+ port);
})