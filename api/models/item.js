const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    category: { type: String, required: true },
    theme: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    characteristics: { type: [String], required: false },
    qty: { type: Number, required: true },
    state: { type: Boolean, required: true },
    usr: { type: String, required: true },
    description: { type: String, required: true },
    addedon: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
