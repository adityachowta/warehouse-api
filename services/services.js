
const inventoryModel = require('../model/inventory')

class Services {

    constructor() {

    }

    updateInventory(id){
        try {
            inventoryModel.findByIdAndUpdate(id)
            return {"status":200, "message":"inventory updated successfully"}
        } catch (error) {
            return error
        }
        
    }

}

module.exports = Services