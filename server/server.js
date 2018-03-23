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
//get all stories by user id.
app.get('/api/stories/:user_id', storyCtrl.getAllByUser);

//get a story by story id
app.get('/api/story/:story_id', storyCtrl.getStory);

//post a new story
app.post('/api/story', storyCtrl.createStory);

//Update a story
app.put('/api/story', storyCtrl.updateStory);

//Delete story
app.delete('/api/story/:story_id', storyCtrl.deleteStory);


app.listen(process.env.SERVER_PORT, () => console.log(`Listening to amazing stories on port ${process.env.SERVER_PORT}...`));