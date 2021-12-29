const Model = require('../Model');
const knex = require('../../config/database');
const util = require('../../modules/util/util');
const { v4: uuidv4 } = require('uuid');
const Mail = require('../../services/Mail');

class seller extends Model{
    
        async create(data){
                try {
                        const emailWasRegistered = await knex('users').where('id', data.ownerId);
                        if(emailWasRegistered.length > 0){
                                
                                
                                
                                return {status: true, user: user[0].email, acessToken, refreshToken};
                        }else{
                                return {status: false, message: 'Vendedor não encontrado', field: 'ownerId'};
                        }
                        
                }catch (error) {
                        return {status: false, message: error.message};
                }
        }
}

module.exports = seller;