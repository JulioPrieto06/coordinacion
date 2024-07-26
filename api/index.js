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
