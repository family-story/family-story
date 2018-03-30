require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , axios = require('axios')
    , storyCtrl = require('./controllers/storyCtrl.js')
    , userCtrl = require('./controllers/userCtrl.js')
    , { SERVER_PORT ,SESSION_SECRET, CONNECTION_STRING, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, LOGIN, LOGOUT } = process.env


const app = express();

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

massive(CONNECTION_STRING).then( db => {
  app.set('db', db);
});

// passport.use(new Auth0Strategy({
//   domain: DOMAIN,
//   clientID: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   callbackURL: CALLBACK_URL,
//   scope: 'openid profile'
// }, function (accessToken, refreshToken, extreParams, profile, done) {
//   const db = app.get('db')
//   const { sub, name, picture } = profile._json

//   db.find_user([sub])
//       .then(resp => {
//           if (resp[0]) {
//               done(null, resp[0].user_id)
//           } else {
//               db.create_user([name, picture, sub])
//                   .then(resp => {
//                       done(null, resp[0].user_id)
//                   })
//           }
//       })

// }))

// passport.serializeUser((id, done) => done(null, id))
// passport.deserializeUser((id, done) => {
//   const db = app.get('db')
//   db.find_logged_in_user([id]).then(resp =>{
//     done(null, resp[0])})
// })

// app.get('/auth', passport.authenticate('auth0'))
// app.get('/auth/callback', (req, res, next) => {
//     const authCB = passport.authenticate('auth0', {
//         successRedirect: LOGIN
//     })
//     authCB(req, res, next)
// })

app.get('/auth/me', async (req, res) => {
    const db = req.app.get('db');
    let user = await db.find_logged_in_user([7])
    user = user[0]
    console.log(user)
    res.status(200).send(user)
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(LOGOUT)
}
)
app.use(bodyParser.json());

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


app.listen(SERVER_PORT, () => console.log(`Listening to amazing stories on port ${SERVER_PORT}...`));