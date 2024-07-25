/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
const itemsRoute = require('./routes/items');
app.use('/api/items', itemsRoute);

module.exports = app;
module.exports.handler = serverless(app);
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(cors());
app.use(express.json());

const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// No se necesita especificar un puerto en Vercel
app.listen(3000, () => {
    console.log(`Server is running`);
});
