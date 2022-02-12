const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser') //middleware

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())//? this converts the data into a json object and sends it through the req body
app.use(cookieParser())

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


// cookies
/*app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true')

  res.cookie('newUser', false)
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true })//secure means the cookie will be sent to the server nly in a https connection
  //                                        ms * sec* min* hrs    // httponly means in console you cant access it through document.cookie

  res.send('you got the cookies')
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies
  res.json(cookies)
})*/