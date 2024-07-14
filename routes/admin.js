const express = require('express');
const auth = require('../middleware/auth');
const Form = require('../models/form');
const User = require('../models/user');
const router = express.Router();

router.get('/forms', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    const forms = await Form.find().populate('user', ['username', 'email']);
    res.json(forms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
