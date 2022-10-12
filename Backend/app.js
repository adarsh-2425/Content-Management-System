const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors =require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

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

const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname,'public')))

// bodyparser parses incoming request. eg: parsing content from form
app.use(bodyParser.json());

app.use('/users', users);

// Index Route
app.get('/', (req,res)=>{
    res.send('Invalid endpoint')
});

// Start Server
app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`);
});