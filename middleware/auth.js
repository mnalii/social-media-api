const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is invalid, authorization denied' });
  }
};

module.exports = auth;
