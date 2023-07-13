const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.isLogin = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new Error();
    const { id } = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findOne({ _id: id });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.isCounselors = (req, res, next) => {
  if (req.user?.role === 'user')
    res.status(401).json({ message: 'Your account is unauthorized ' });
  else next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') next();
  else res.status(401).json({ message: 'Your account is unauthorized ' });
};
