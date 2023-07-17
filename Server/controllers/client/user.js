const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../../models/User');

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        res.status(400).json({ message: 'Your Email had been registed' });
      } else {
        bcrypt
          .hash(req.body.password, 12)
          .then((hash) => {
            User.create({
              fullName: req.body.fullName,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              role: 'user',
            })
              .then(() => res.json({ message: 'Success' }))
              .catch((err) =>
                res.status(500).json({ message: "Can't connect to server" })
              );
          })
          .catch((err) =>
            res.status(500).json({ message: 'Some thing went wrong' })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Can't connect to server" })
    );
};

exports.signin = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(400).json({ message: 'Your email is not registered' });
    } else {
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
              expiresIn: '7d',
            });
            res.json({
              user: {
                email: user.email,
                fullName: user.fullName,
                phone: user.phone,
              },
              token,
            });
          } else
            res.status(400).json({ message: 'Your password is incorrect' });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Some thing went wrong' });
        });
    }
  });
};

exports.check = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new Error('Fail');
    const { id } = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findOne({ _id: id });
    res.json({
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    });
  } catch (err) {
    res.json(0);
  }
};
