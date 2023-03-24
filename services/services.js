
const inventoryModel = require('../model/inventory')

class Services {

    constructor() {}
    
    async checkInventory(contain_articles) {
        try {

            for (const article of contain_articles) {
                var inventory = await inventoryModel.find({ 'art_id': article.art_id });
                console.log("INV> " + inventory);
                console.log("inventory[0].stock > " + inventory[0].stock);
                console.log("article.amount_of > " + article.amount_of);

                var stock = parseInt(inventory[0].stock)
                var amount = parseInt(article.amount_of)
                if (stock < amount) {
                    return false;
                }
            };
            return true;
        } catch (error) {
            return error
        }
    }

    async updateInventory(art_id, amount_of) {
        try {
            var article = await inventoryModel.find({ 'art_id': art_id });
            var stock = parseInt(article[0].stock);
            var amount_of = parseInt(amount_of)
            var updated_stock = (stock - amount_of);

            console.log("updated stock> " + updated_stock)
            await inventoryModel.findOneAndUpdate({ 'art_id': art_id }, { stock: updated_stock.toString() })
            return { "status": 200, "message": "inventory updated successfully" }

        } catch (error) {
            return error
        }
    }

}

module.exports = Services