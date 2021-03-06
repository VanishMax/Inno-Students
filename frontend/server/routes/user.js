const moment = require('moment');
const database = require('../config/connection');

let User; let Post;
database.getInstance((db) => {
  User = db.collection('users');
  Post = db.collection('posts');
});

const draftsAggregate = match => (
  [
    {
      $match: {
        status: 'E',
        ...match,
      },
    }, {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    }, {
      $unwind: '$author',
    }, {
      $project: {
        'author.username': 1,
        creationDate: 1,
        publishTime: 1,
        'en.title': 1,
        'ru.title': 1,
        url: 1,
        tag: 1,
      },
    },
  ]
);

module.exports = (app, server) => {
  // My published posts
  app.get('/user/posts', (req, res) => {
    if (req.user) {
      Post.find({ status: 'P', author: req.user._id }).toArray((err, posts) => {
        server.render(req, res, '/user/posts', { posts, user: req.user });
      });
    } else {
      server.render(req, res, '/user/posts', {});
    }
  });
  app.post('/user/posts', (req, res) => {
    if (req.user) {
      Post.find({ status: 'P', author: req.user._id }).toArray((err, posts) => {
        res.json({ posts, user: req.user });
      });
    } else {
      res.json({});
    }
  });

  // My drafts
  app.get('/user/drafts', (req, res) => {
    if (req.user) {
      Post.aggregate(draftsAggregate({
        $or: [
          { author: req.user._id },
          { sharedWith: req.user._id },
        ],
      })).sort({ publishTime: -1 }).toArray((err, posts) => {
        server.render(req, res, '/user/drafts', { posts, user: req.user });
      });
    } else {
      server.render(req, res, '/user/drafts', {});
    }
  });
  app.post('/user/drafts', (req, res) => {
    if (req.user) {
      Post.aggregate(draftsAggregate({
        $or: [
          { author: req.user._id },
          { sharedWith: req.user._id },
        ],
      })).sort({ publishTime: -1 }).toArray((err, posts) => {
        res.json({ posts, user: req.user });
      });
    } else {
      res.json({});
    }
  });

  // Admin's all drafts
  app.get('/user/alldrafts', (req, res) => {
    if (req.user && req.user.role === 'A') {
      Post.aggregate(draftsAggregate({})).sort({ publishTime: -1 }).toArray((err, posts) => {
        server.render(req, res, '/user/alldrafts', { posts, user: req.user });
      });
    } else {
      server.render(req, res, '/user/alldrafts', {});
    }
  });
  app.post('/user/alldrafts', (req, res) => {
    if (req.user && req.user.role === 'A') {
      Post.aggregate(draftsAggregate({})).sort({ publishTime: -1 }).toArray((err, posts) => {
        res.json({ posts, user: req.user });
      });
    } else {
      res.json({});
    }
  });

  // Admin's all users
  app.get('/user/users', (req, res) => {
    if (req.user && req.user.role === 'A') {
      User.find(
        { _id: { $ne: req.user._id } },
        { projection: { password: 0 } },
      ).toArray((err, users) => {
        server.render(req, res, '/user/users', { users, user: req.user });
      });
    } else {
      server.render(req, res, '/user/users', {});
    }
  });
  app.post('/user/users', (req, res) => {
    if (req.user && req.user.role === 'A') {
      User.find(
        { _id: { $ne: req.user._id } },
        { projection: { password: 0 } },
      ).toArray((err, users) => {
        res.json({ users, user: req.user });
      });
    } else {
      res.json({});
    }
  });

  // Get all users with role Editor
  app.post('/user/editors', (req, res) => {
    if (req.user) {
      User.find({ _id: { $ne: req.user._id }, role: 'E' }, {
        projection: {
          username: 1, _id: 1, ru: 1, en: 1,
        },
      }).toArray((err, users) => {
        res.json({ users });
      });
    } else {
      res.json({});
    }
  });

  // Admin's request messages
  app.get('/user/requests', (req, res) => {
    if (req.user && req.user.role === 'A') {
      User.find({ 'request.date': { $ne: '' }, 'request.approved': false }, { projection: { request: 1, username: 1, _id: 1 } }).toArray((err, users) => {
        server.render(req, res, '/user/requests', { users, user: req.user });
      });
    } else {
      server.render(req, res, '/user/requests', {});
    }
  });
  app.post('/user/requests', (req, res) => {
    if (req.user && req.user.role === 'A') {
      User.find({ 'request.date': { $ne: '' }, 'request.approved': false }, { projection: { request: 1, username: 1, _id: 1 } }).toArray((err, users) => {
        res.json({ users, user: req.user });
      });
    } else {
      res.json({});
    }
  });

  // Request for becoming an author
  app.post('/user/request', (req, res) => {
    if (req.user) {
      User.findOneAndUpdate({ _id: req.body.user }, {
        $set: {
          'request.alias': req.body.alias,
          'request.text': req.body.text,
          'request.date': moment().format('DD-MM-YYYY HH:mm'),
        },
      }, (err) => {
        if (err) res.json({ message: err.message });
        res.json({ message: 'all right' });
      });
    } else {
      res.status(403).json({ message: 'go fuck yourself' });
    }
  });

  // Edit User profile: img, role and then text
  app.post('/user/edit/img', (req, res) => {
    if (req.user) {
      User.findOneAndUpdate({ _id: req.body._id }, { $set: { img: req.body.img !== '' ? req.body.img : req.user.img } }, (err) => {
        if (err) res.json({ message: err.message });
        res.json({ message: 'all right' });
      });
    } else {
      res.json({ message: 'go fuck yourself' });
    }
  });

  // Change role of some user
  app.post('/user/edit/role', (req, res) => {
    if (req.user && req.user.role === 'A' && req.body.role) {
      User.findOneAndUpdate({ _id: req.body._id }, { $set: { role: req.body.role } }, (err) => {
        if (err) res.json({ message: err.message });
        res.json({ message: 'all right' });
      });
    } else {
      res.json({ message: 'go fuck yourself' });
    }
  });

  app.post('/user/request/approve', (req, res) => {
    if (req.user && req.user.role === 'A' && req.body.role) {
      User.findOneAndUpdate({ _id: req.body._id }, { $set: { role: req.body.role, 'request.approved': true } }, (err) => {
        if (err) res.json({ message: err.message });
        res.json({ message: 'all right' });
      });
    } else {
      res.json({ message: 'go fuck yourself' });
    }
  });

  app.post('/user/edit', (req, res) => {
    const { body } = req;
    if (req.user) {
      User.findOne({ _id: body._id }, (err, user) => {
        User.findOneAndUpdate({ _id: body._id }, {
          $set: {
            username: body.username !== '' ? body.username : user.username,
            website: body.website !== '' ? body.website : user.website,
            img: body.img !== '' ? body.img : user.img,
            'en.name': body.enName !== '' ? body.enName : user.en.name,
            'en.surname': body.enSurname !== '' ? body.enSurname : user.en.surname,
            'ru.name': body.ruName !== '' ? body.ruName : user.ru.name,
            'ru.surname': body.ruSurname !== '' ? body.ruSurname : user.ru.surname,
          },
        }, (err) => {
          if (err) res.json({ message: err.message });
          res.json({ message: 'all right' });
        });
      });
    } else {
      res.json({ message: 'go fuck yourself' });
    }
  });
};
