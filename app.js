const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())//? this converts the data into a json object and sends it through the req body


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://bunty:bunty@jwtauth.omgiw.mongodb.net/AuthNetNinja?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)