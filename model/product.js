
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const inventorySchema = require('./inventory')



const productSchema = new Schema({
    "name": {
        required: true,
        type: String
    },
    "contain_articles": {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('Product', productSchema)