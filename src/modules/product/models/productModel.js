const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const util = require('../../../repositories/util/util');
const { v4: uuidv4 } = require('uuid');

class Products extends Model{
    async create(data){
        try {
			const sellerWasRegistered = await knex('sellers').where('ownerId', data.ownerId).select('id');
			if(sellerWasRegistered.length > 0){
					const id = uuidv4();
					delete data.ownerId;
					const product = await knex('products').insert({...data, id, sellerId: sellerWasRegistered[0].id}).then(() => {return knex ('products').where('id', id).select('name')});
					if(product.length > 0){
						return {status: true, data: product[0]};
					}else{
						return {status: false, message: 'Produto não foi cadastrado'};
					}
			}else{
				return {status: false, message: 'Loja não cadastrada', field: 'ownerId'};
			}
        }catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
        }
    }
}

module.exports = Products;