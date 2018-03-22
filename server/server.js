require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , axios = require('axios')
    , storyCtrl = require('./controllers/storyCtrl.js')
    , googleCtrl = require('./controllers/googleCtrl.js');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../build'));

massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db);
});

//Endpoints to access our database
app.get('/api/stories/:id', storyCtrl.getAllByUser);


app.listen(process.env.SERVER_PORT, () => console.log(`Listening to amazing stories on port ${process.env.SERVER_PORT}...`));