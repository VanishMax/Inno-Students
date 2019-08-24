require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const port = process.env.PORT || 3000;

const config = require('./config/config');
const db = require('./config/connection');

db.initPool();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey],
  }),
);
// app.use(passport.initialize());
// app.use(passport.session());
// require('./server/config/localAuth')(passport);

// require('./server/routes/auth')(app, server);
// require('./server/routes/user')(app, server);
// require('./server/routes/post')(app, server);

app.get('*', (req, res) => {
  res.json({message: 'It\'s all right'});
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
