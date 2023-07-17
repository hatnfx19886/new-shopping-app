const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../../models/User');

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user || user.role === 'user') {
        res.status(401).json({ message: 'Your account is unauthorized' });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result) {
              const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
                expiresIn: '7d',
              });
              res.json({
                role: user.role,
                token,
              });
            } else
              res.status(400).json({ message: 'Your password is incorrect' });
          })
          .catch(() =>
            res.status(400).json({ message: 'Some thing went wrong' })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Can't connect to server" })
    );
};

exports.check = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new Error('Fail');
    const { id } = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findOne({ _id: id });
    if (!user || user.role !== 'admin') throw new Error('Fail');
    res.json({
      role: 'admin',
    });
  } catch (err) {
    res.json(0);
  }
};
