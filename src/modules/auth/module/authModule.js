const auth = require('../models/authModel');

module.exports = {
    async init(db){
        return new auth(db);
    }
}