const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const util = require('../../../repositories/util/util');

class Products extends Model{
    async create(data){
        try {
                const sellerWasRegistered = await knex('sellers').where('ownerId', data.ownerId).select('id');
                if(sellerWasRegistered.length > 0){
                        const id = await util.createId("idProduct "+ sellerWasRegistered[0].id);
                        const normalized = data.name.toLowerCase();
                        const seller = await knex('products').insert({...data, id, sellerId: sellerWasRegistered[0].id, normalized}).then(() => {return knex ('sellers').where('id', id).select('name')});
                        if(seller.length > 0){
                                return {status: true, data: seller[0]};
                        }else{
                                return {status: false, message: 'Loja não foi cadastrada'};
                        }
                }else{
                        return {status: false, message: 'Vendedor não encontrado', field: 'ownerId'};
                }
        }catch (error) {
                return {status: false, message: error.sqlMessage ?? error.message};
        }
    }
}

module.exports = Products;