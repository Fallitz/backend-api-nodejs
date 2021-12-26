const jwt = require('jsonwebtoken');
const knex = require('../../config/database');
const { v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');
const { expectCt } = require('helmet');
//const Model = require('./Model');

module.exports = {
    async createId(email){
        const id = uuidv5(email, process.env.SECRET_TOKEN_FOR_ID_USER);
        return String(id);
        },
    
        async comparePassword (plainTextPassword, dbPassword){
            const match = await bcrypt.compare(`%3456$${plainTextPassword}&92@7`, dbPassword);
            return match;
        },
    
        async encriptPassword (password){
            const hash = await bcrypt.hashSync(`%3456$${password}&92@7`, 10);
            return hash;
        },

        async generateToken(data, secret, expiresIn){
            return jwt.sign(data, secret, expiresIn ? {expiresIn} : null);
        },

        async verifyToken(token, secret){
            return jwt.verify(token, secret, function(err, data){
                if (err) return false;
                return data;
            })
        },
        
}