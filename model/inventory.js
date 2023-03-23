const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    "art_id": {
        required: true,
        type: String
    },
    "name": {
        required: true,
        type: String
    },
    "stock": {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)