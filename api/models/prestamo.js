const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
    //nuevo schema
    fechaEntrega: { type: String, required: true }
        
});

module.exports = mongoose.model('Prestamo', prestamoSchema);