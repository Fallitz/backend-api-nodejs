const product = require('../models/productModel');

module.exports = {
    async init(db){
        return new product(db);
    }
}