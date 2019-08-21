const passport = require('passport');

module.exports = (app, server) => {
  app.post('/user', (req, res) => {
    res.json({ user: req.user });
  });

  app.post('/user/signup', (req, res, next) => {
    passport.authenticate('local-signup', {}, async (err, user, message) => {
      await user;

      if (err) return server.render(req, res, '/user/signup', { error: err });
      if (!user) {
        return server.render(req, res, '/user/signup', { error: message });
      }
      req.logIn(user, (err) => {
        if (err) return server.render(req, res, '/user/signup', { error: err });
        res.redirect('/user');
        return server.render(req, res, '/user');
      });
    })(req, res, next);
  });

  app.post('/user/login', (req, res, next) => {
    passport.authenticate('local-login', {}, async (err, user, message) => {
      await user;

      if (err) server.render(req, res, '/user/login', { error: err });
      if (!user) {
        server.render(req, res, '/user/login', { error: message });
      } else {
        req.logIn(user, (err) => {
          if (err) server.render(req, res, '/user/login', { error: err });
          res.redirect('/user');
          server.render(req, res, '/user');
        });
      }
    })(req, res, next);
  });

  // Delete User's session - logOut
  app.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    server.render(req, res, '/');
  });
};
