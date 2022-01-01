const Model = require('../Model');
const knex = require('../../config/database');
const util = require('../../modules/util/util');
const { v4: uuidv4 } = require('uuid');
const Mail = require('../../services/Mail');

class seller extends Model{
    
        async create(data){
                try {
                        const sellerWasRegistered = await knex('users').where('id', data.ownerId).select('id');
                        if(sellerWasRegistered.length > 0){
                                const id = await util.createId("idSeller "+ sellerWasRegistered[0].id);
                                const storeWasRegistered = await knex('sellers').where('id', id).select('id');
                                if(storeWasRegistered.length > 0){
                                        return {status: false, message: 'Usuário já possui loja cadastrada'};
                                }else{
                                        const ownerId = sellerWasRegistered[0].id;
                                        const address = data.address;
                                        delete data.address;
                                        const seller = await knex('sellers').insert({...data, ...address, id, ownerId}).then(() => {return knex ('sellers').where('id', id).select('name')});
                                        if(seller.length > 0){
                                                return {status: true, data: seller[0]};
                                        }else{
                                                return {status: false, message: 'Loja não foi cadastrada'};
                                        }
                                }
                        }else{
                                return {status: false, message: 'Vendedor não encontrado', field: 'ownerId'};
                        }
                }catch (error) {
                        return {status: false, message: error.sqlMessage ?? error.message};
                }
        }
        async get (id){
                try {
                        const seller = await knex('sellers').where('id', id).select(['id', 'name', 'ownerId', 'address', 'created_at']);
                        if(seller.length > 0){
                                return {status: true, data: seller[0]};
                        }else{
                                return {status: false, message: 'Loja não encontrada'};
                        }
                } catch (error) {
                        return {status: false, message: error.sqlMessage ?? error.message};
                }
        }
}

module.exports = seller;