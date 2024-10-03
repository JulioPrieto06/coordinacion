const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
    //nuevo schema
    fechaEntrega: { type: String, required: true },
    fechaLimite: {type:String,required:true},
    nombreQuienRecibe: {type:String, required:true},
    articulos:[
        {
            id:{type:String, required:true},
            nombre:{type:String, required:true},
            cantidad:{type:String, required:true},
            almacen:{type:String, required:true}
        }
    ],
    status:{type:Boolean, default:true}
});

module.exports = mongoose.model('Prestamo', prestamoSchema);