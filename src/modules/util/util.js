require("dotenv").config();
const jwt = require('jsonwebtoken');
const knex = require('../../config/database');
const { v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');
const { expectCt } = require('helmet');

module.exports = {
    async createId(data){
        const id = uuidv5(data, process.env.SECRET_TOKEN_FOR_ID);
        return id;
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

    async updateLastLogin(id){
        try{
            const date = new Date();
            return knex('users').where('id', id).update('lastAcess_at', date);
        }catch(error){
            return error(error.message);
        }
    }
    
}