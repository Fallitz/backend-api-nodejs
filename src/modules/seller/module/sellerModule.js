const seller = require('../models/sellerModel');

module.exports = {
    async init(db){
        return new seller(db);
    }
}