const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = 3000;

const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');

// Connect to db
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true },(err) => {
  if(err) {
    throw Error('Error connecting to db');
  }
  console.log('connected to db');
});


// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoutes);
app.use('/mainframe', mainRoutes)




app.listen(
  port, () => 
  console.log(`node-auth-example is running on ${ port }`));