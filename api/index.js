const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
const itemsRoute = require('./routes/items');
app.use('/api/items', itemsRoute);

module.exports = app;
module.exports.handler = serverless(app);

/*module.exports = (req, res) => {
    res.status(200).send('Hello, world!');
  };*/
  
