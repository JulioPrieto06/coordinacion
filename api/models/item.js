const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    //nuevo schema
    usr: { type: String, required: true }, //quien agregó el producto
    usrTwo: { type: String, required: true }, //usuario al que se le presta el producto
    almacen: {type: String, required: true}, //ubicacion física del producto
    tipoDeMaterial: {type: String, required: true}, //material del que está hecho el producto x ejemplo: peyon, peluche, 3d, etc
    tematica: {type: String, required: true},//temática principal para la que se usará esté producto x ejemplo: lección, misionero, pase de lista
    serie: {type: String, required: true},// colección a la que pertenece el producto: naturaleza, animales, personajes, de la bíblia, etc.
    etiqueta:{type: String, required: false}, //diferentes tematicas que puede comparir 1 solo producto
    addedon: { type: Date, default: Date.now }, // fecha en que se agrega el producto
    producto:
        {
        name: { type: String, required: true }, //nombre del producto
        description: { type: String, required: true }, //descripción del producto
        quantity: {type: String, required: true}, //cantidad de artículos 
        state: {
            available: {type: Boolean, required:true}, //disponibilidad del producto para préstamo
            asset: {type: Boolean, required:true}, //estado del producto (si está en alamecén)
        }
    },

    
});

module.exports = mongoose.model('Item', itemSchema);
