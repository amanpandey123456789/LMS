const User = require('../models/User');

const getAllMembers = async (req, res) => {
  try {
    const members = await User.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { getAllMembers };
