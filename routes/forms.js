const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Form = require('../models/form');
const router = express.Router();

router.post('/', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description } = req.body;
  try {
    const newForm = new Form({ title, description, user: req.user.id });
    const form = await newForm.save();
    res.json(form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
