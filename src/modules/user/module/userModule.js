const user = require('../models/userModel');

module.exports = {
    async init(db){
        return new user(db);
    }
}