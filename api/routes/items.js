const express = require('express');
const router = express.Router();
const Item = require('../models/item');

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


module.exports = router;
