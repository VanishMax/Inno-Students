const database = require('../config/connection');

let Post; let Counter; let User;
database.getInstance((db) => {
  Counter = db.collection('counters');
  Post = db.collection('posts');
  User = db.collection('users');
});

const checkPost = require('./utils/checkPost');
const aggregatePosts = (match, limOfs, cb) => {
  Post.aggregate([
    {
      $match: {
        ...match,
        public: true,
      },
    }, {
      $sort: { publishTime: -1 },
    },
    ...limOfs,
    {
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
        'author.signedDate': 0,
        'author.password': 0,
        'author.request': 0,
        creationDate: 0,
        sharedWith: 0,
        'en.content': 0,
        'ru.content': 0,
        comments: 0,
      },
    },
  ]).collation({ locale: 'en', strength: 2 }).toArray(cb);
};

module.exports = (app) => {
  // Get images of the post to use in cover dialog
  app.get('/post/images', (req, res) => {
    const id = req.body.post;
    if (id) {
      Post.findOne({ _id: id }, { projection: { img: 1, images: 1 } }, (err, post) => {
        if (!post) {
          res.json({ message: 'No such post' });
        } else {
          res.json({ message: 'Done', post });
        }
      });
    } else {
      res.json({ message: 'No ID provided' });
    }
  });

  // Get the stats of the post before publishing
  app.get('/post/publishData', (req, res) => {
    const id = req.body.post;
    if (id) {
      Post.findOne({ _id: id }, async (err, post) => {
        if (post) {
          post.author = await User.findOne({ _id: post.author }, { projection: { password: 0 } });
          if (req.user && (req.user._id === post.author._id || req.user.role === 'A'
            || post.sharedWith.indexOf(req.user._id) !== -1)) {
            await res.json(checkPost(post));
          } else {
            res.status(403).json({ message: 'Not allowed' });
          }
        } else {
          await res.json({ message: 'No such post' });
        }
      });
    } else {
      res.json({ message: 'No ID provided' });
    }
  });

  app.get('/post/:url', (req, res) => {
    Post.findOne({
      $or: [{ url: req.params.url }, { oldUrl: req.params.url }],
    }, async (err, post) => {
      if (!err && post) {
        post.author = await User.findOne({ _id: post.author }, { projection: { password: 0 } });
        if (!req.user) {
          await res.json({ slug: post.url, post, role: 'U' });
        } else if (req.user._id === post.author._id || req.user.role === 'A') {
          await res.json({ slug: post.url, post, role: 'A' });
        } else if (post.sharedWith.indexOf(req.user._id) !== -1) {
          await res.json({ slug: post.url, post, role: 'E' });
        }
      } else {
        await res.json({ post: null, isAuthor: null });
      }
    });
  });

  // Get and send posts on index or tag
  app.get(['/', '/tag/:slug'], (req, res) => {
    const match = {
      status: 'P',
    };
    if (req.params.slug) match.tag = req.params.slug.replace(/ /, '').toLowerCase();

    const limOfs = [
      { $skip: 0 },
      { $limit: 6 },
    ];
    if (req.body.limit && req.body.offset) {
      limOfs[0].$skip = req.body.offset;
      limOfs[1].$limit = req.body.limit;
    }

    aggregatePosts(match, limOfs, (err, posts) => {
      res.json({ posts, slug: req.query.slug ? req.query.slug : '' });
    });
  });
};
