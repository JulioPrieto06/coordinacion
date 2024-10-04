const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Prestamo = require('../models/prestamo');

// POST: Create a new item
router.post('/', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Retrieve items
router.get('/obtener/tematicas', async (req, res) => {
    try {
        const tematicas = await Item.aggregate([
            {
                $group: {
                    _id: "$tematica",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    categoria: "$_id",
                    count: 1
                }
            }
        ])
        res.json(tematicas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Retrieve items by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found'   
 });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message   
 });
    }
});

// PATCH: Update an item
router.patch('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete an item
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Obtener por categoria
router.get('/consultar/producto/tematica/:tematica', async (req, res) => {
    try{
        const items = await Item.find({tematica: req.params.tematica});
        res.json(items);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

//GET: Obtener todos los prestamos
router.get('/prestamos/obtener', async (req,res) => {
    try{
    const items = await Prestamo.find();
    res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}); 

//GET: Obtener prestamos por idUsuario
router.get('/prestamos/obtener/id-usuario/:id', async(req,res) => {
    try{
        const prestamos = await Prestamo.find({idUsuario:req.params.id});
        res.status(200).json(prestamos);
    }catch(err){
        res.status(500).json({message: err.message, error:true});
    }
})

//POST: Guardar prestamo y actualizar cantidad disponible de cada producto.
router.post('/prestamos/guardar', async (req, res) => {
    const newPrestamo = new Prestamo(req.body);

    try {

        for (let articulo of newPrestamo.articulos) { 
            const item = await Item.findById(articulo.id);
            if (!item) {
                return res.status(404).json({ message: `Item con id ${articulo.id} no encontrado`, "error":true});
            }
            if (item.producto.quantity < articulo.cantidad) {
                return res.status(400).json({
                    message: `No hay suficiente cantidad disponible para el artículo ${item.nombre}`,"error":true
                });
            }
            item.producto.quantity -= articulo.cantidad;
            await item.save();
        }

        const savedPrestamo = await newPrestamo.save();
        res.status(201).json({message:"Prestamo guardado correctamente", "error": false, savedPrestamo});
    } catch (err) {
        res.status(400).json({ message: err.message, "error":true});
    }
});

//PATCH: Actualiza status del prestamo(entegado-pendiente)
router.patch('/prestamos/actualizar/:id', async(req,res) => {
    try{
        const updatePrestamo = await Prestamo.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
        if (!updatePrestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' , "error":true});
        }
        res.status(200).json({message: "Cambios guardados correctamente", "error": false, updatePrestamo});
    } catch(err){
        res.status(500).json({ message: err.message, "error":true});
    }
})

module.exports = router;