const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const util = require('../../../repositories/util/util');

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
					const normalized = data.name.toLowerCase();
					const seller = await knex('sellers').insert({...data, ...address, id, ownerId, normalized}).then(() => {return knex ('sellers').where('id', id).select('name')});
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

	async get (ownerId){
		try {
			const seller = await knex('sellers').where('active', 1).where('ownerId', ownerId).select(['id', 'name', 'phone', 'description', 'avatar']);
			if(seller.length > 0){
				return {status: true, data: seller[0]};
			}else{
				return {status: false, message: 'Loja não encontrada'};
			}
		} catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}

	async getById (id){
		try {
			const seller = await knex('sellers').where('active', 1).where('id', id).select(['id', 'name', 'phone', 'description', 'avatar']);
			if(seller.length > 0){
				return {status: true, data: seller[0]};
			}else{
				return {status: false, message: 'Loja não encontrada'};
			}
		} catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}

	async listSellers (lim, skip){
		try {
			var limit = parseInt(lim);
			var offset = parseInt(skip);
			const count = await knex('sellers').count('id as count');
			if(limit < 0 || offset < 0){
				return {status: false, message: 'Limite e offset devem ser maiores que zero'};
			}
			if(offset > count[0].count - count[0].count%limit){ 
				offset = count[0].count - count[0].count%limit;
				limit = count[0].count%limit;
			}
			const data = await knex('sellers').where('active', 1).select(['id', 'name', 'avatar']).orderBy([{ column: 'online', order: 'desc' }]).limit(limit).offset(offset);
			const pagination = `${data.length + offset}/${count[0].count}`;
			if(data.length > 0){
				return {status: true, data: data, pagination};
			}else{
				return {status: false, message: 'Nenhuma loja cadastrada'};
			}
		} catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}
	
	async searchSellers (lim, skip, search){
		try {
			var limit = parseInt(lim);
			var offset = parseInt(skip);
			const buscar = search.toLowerCase();
			const count = await knex('sellers').where('active', 1).where('normalized', 'like', `%${buscar}%`).count('id as count');
			if(limit < 0 || offset < 0){
				return {status: false, message: 'Limite e offset devem ser maiores que zero'};
			}
			if(offset > count[0].count - count[0].count%limit){ 
				offset = count[0].count - count[0].count%limit;
				limit = count[0].count%limit;
			}
			const data = await knex('sellers').where('active', 1).where('normalized', 'like', `%${buscar}%`).select(['id', 'name', 'avatar']).limit(limit).offset(offset);
			if(data.length > 0){
				return {status: true, data: data};
			}else{
				return {status: true, data: 'Nenhuma loja encontrada'};
			}
		} catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}
        
}

module.exports = seller;