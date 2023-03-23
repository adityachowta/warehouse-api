const express = require('express');
const router = express.Router();
const inventoryModel = require('../model/inventory')
const productModel = require('../model/product')
const Services = require('../services/services')

const service = new Services()

// create a new product:
router.post('/add-product', async (req, res) => {
    const data = new productModel({
        name: req.body.name,
        contain_articles: req.body.contain_articles
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// fetch all products:
router.get('/get-products', async (req, res) => {
    try {
        const data = await productModel.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// fetch single product:
router.get('/get-product/:id', async (req, res) => {
    try {
        const data = await productModel.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// sell product and update inventory:
router.post('/sell-products', async(req, res)=>{
    try {
        const data = await productModel.findById(req.body.id);
        
        productModel.deleteOne(req.body.id);
        service.updateInventory();
    } catch (error) {
        
    }
})

router.post('/load-inventory', async (req, res) => {
    const data = new inventoryModel({
        art_id: req.body.art_id,
        name: req.body.name,
        stock: req.body.stock
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.get('/get-inventory', async (req, res) => {
    try {
        const data = await inventoryModel.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/get-one-inventory/:id', async (req, res) => {
    try {
        const data = await inventoryModel.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router