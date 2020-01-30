const router = require('express').Router();
const User = require('../models/User');
const { registerValidate, loginValidate } = require('../validation');
const { generatePassword } = require('../utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { error } = registerValidate(req.body);
  if(error) return res.status(400).send(error);

  // Check if the email already exists;
  const emailExists = await User.findOne({ email: req.body.email });
  if(emailExists) return res.status(400).send('emailExists');


  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await generatePassword(req.body.password)
  });
  
  //Save
  try {
    const savedUser = await user.save();
    res.send({ _id: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidate(req.body);
  if(error) return res.status(400).send(error);
  
  const user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send('!emailExists');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('!validPass');
  
  // Create token

  const token = jwt.sign({ _id: user._id, name: user.name, dateCreated: user.dateCreated }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});


module.exports = router;