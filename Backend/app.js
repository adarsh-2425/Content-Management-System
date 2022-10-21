const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors =require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
var session = require('express-session');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to Database');
});
// On Error
mongoose.connection.on('error',(err)=>{
    console.log('Database error:' +err);
});

const app = express();

const users = require('./routes/users');
const contents = require('./routes/contents');
const categories = require('./routes/categories');

const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname,'public')))

// bodyparser parses incoming request. eg: parsing content from form
app.use(bodyParser.json());

// Passport Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/contents', contents);
app.use('/categories', categories);

// Index Route
app.get('/', (req,res)=>{
    res.send('Invalid endpoint')
});

// Start Server
app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
});