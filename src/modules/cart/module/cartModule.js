const cart = require('../models/cartModel');

module.exports = {
    async init(db){
        return new cart(db);
    }
}