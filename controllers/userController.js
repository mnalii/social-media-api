const User = require('../models/User');

const getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json('Server error');
    console.error(err.message);
  }
};

module.exports = {
  getAuthUser
};
