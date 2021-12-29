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
                                        const country = data.address.country;
                                        const state = data.address.state;
                                        const city = data.address.city;
                                        const district = data.address.district;
                                        const street = data.address.street;
                                        const number = data.address.number;
                                        const complement = data.address.complement;
                                        const reference = data.address.reference;
                                        const zipCode = data.address.zipCode;
                                        delete data.address;

                                        const seller = await knex('sellers').insert({...data, id, ownerId, country, state, city, district, street, number, complement, reference, zipCode}).then(() => {return knex ('sellers').where('id', id).select('name')});
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
                        return {status: false, message: error.message};
                }
        }
}

module.exports = seller;