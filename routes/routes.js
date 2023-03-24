const express = require('express');
const router = express.Router();
const inventoryModel = require('../model/inventory')
const productModel = require('../model/product')
const Services = require('../services/services')

const service = new Services()

// create a new product:
router.post('/add-products', async (req, res) => {

    try {
        var products = req.body.products;

        for (const item of products) {
            const data = new productModel({
                name: item.name,
                contain_articles: item.contain_articles
            })

            await data.save();

        }

        res.status(200).json({ message: "products uploaded" });

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
router.post('/sell-products', async (req, res) => {
    try {
        const data = await productModel.findById(req.body.id);

        if (data != null) {
            var contain_articles = data.contain_articles

            var isStock = await service.checkInventory(contain_articles);

            if (isStock) {
                for (const article of contain_articles) {
                    console.log(article.art_id)
                    await service.updateInventory(article.art_id, article.amount_of);
                }

                await productModel.deleteOne({ '_id': req.body.id });
                res.json({ "status": 200, "message": "Product sold" })

            } else {
                res.status(400).json({ status: 400, message: "insufficient stock of articles." })
            }
        } else {
            res.json({ "status": 400, "message": "Product unavailable" })
        }

    } catch (error) {
        res.status(400).json({ status: 400, message: error.message })
    }
})

// load inventory item
router.post('/load-inventory', async (req, res) => {
    try {
        var inventory = req.body.inventory;

        for (const item of inventory) {
            const data = new inventoryModel({
                art_id: item.art_id,
                name: item.name,
                stock: item.stock
            })

            await data.save();

        }

        res.status(200).json({ message: "inventory updated" });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// get inventory items
router.get('/get-inventory', async (req, res) => {
    try {
        const data = await inventoryModel.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//get inventory by id
router.get('/get-one-inventory/:id', async (req, res) => {
    try {
        const data = await inventoryModel.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router