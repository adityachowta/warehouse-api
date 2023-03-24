
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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