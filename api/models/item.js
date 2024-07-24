const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Added for peyon and 3D
    theme: { type: String, required: true }, // Represents the thematic collection
    type: { type: String, required: true }, // Type of item, e.g., tree, rock, etc.
    name: { type: String, required: true },
    characteristics: { type: [String], required: false }, // Array of characteristics
    qty: { type: Number, required: true },
    state: { type: Boolean, required: true },
    usr: { type: String, required: true },
    description: { type: String, required: true },
    addedon: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
