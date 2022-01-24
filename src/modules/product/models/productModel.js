const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const { v4: uuidv4 } = require('uuid');
const seller = require('../../seller/models/sellerModel');

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
	
	async getById(id){
		try {
			const product = await knex('products').where('id', id).select('name', 'description', 'price', 'sellerId');
			if(product.length > 0){
				return {status: true, data: product[0]};
			}else{
				return {status: false, message: 'Produto não encontrado'};
			}
		}catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}

	async getBySellerId(sellerId, lim, skip){
		try {
			if (sellerId == "" || sellerId == undefined || sellerId == null){
				return {status: false, message: 'Vendedor não encontrado'};
			}
			var limit = parseInt(lim);
			var offset = parseInt(skip);
			const count = await knex('products').where('sellerId', sellerId).count('id as count');
			if(limit < 0 || offset < 0){
				return {status: false, message: 'Limite e offset devem ser maiores que zero'};
			}
			if(offset > count[0].count - count[0].count%limit){ 
				offset = count[0].count - count[0].count%limit;
				limit = count[0].count%limit;
			}
			const products = await knex('products').where('sellerId', sellerId).select('id', 'name', 'description', 'price').orderBy([{ column: 'created_at', order: 'asc' },{ column: 'name', order: 'asc' }]).limit(limit).offset(offset);
			const pagination = `${products.length + offset}/${count[0].count}`;
			if(products.length > 0){
				return {status: true, data: products, pagination};
			}else{
				return {status: false, message: 'Nenhum produto encontrado'};
			}
		}catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}

	async listProducts(lim, skip){
		try {
			var limit = parseInt(lim);
			var offset = parseInt(skip);
			const count = await knex('products').count('id as count');
			if(limit < 0 || offset < 0){
				return {status: false, message: 'Limite e offset devem ser maiores que zero'};
			}
			if(offset > count[0].count - count[0].count%limit){ 
				offset = count[0].count - count[0].count%limit;
				limit = count[0].count%limit;
			}
			const products = await knex('products').select('id', 'name', 'description', 'price').orderBy([{ column: 'created_at', order: 'asc' },{ column: 'name', order: 'asc' }]).limit(limit).offset(offset);
			const pagination = `${products.length + offset}/${count[0].count}`;
			if(products.length > 0){
				return {status: true, data: products, pagination};
			}else{
				return {status: false, message: 'Nenhum produto encontrado'};
			}
		}catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}

	async searchProduct(name, lim, skip){
		try {
			if (name == "" || name == undefined || name == null){
				return {status: false, message: 'Nome não encontrado'};
			}
			var limit = parseInt(lim);
			var offset = parseInt(skip);
			const count = await knex('products').where('name', 'like', `%${name}%`).count('id as count');
			if(limit < 0 || offset < 0){
				return {status: false, message: 'Limite e offset devem ser maiores que zero'};
			}
			if(offset > count[0].count - count[0].count%limit){ 
				offset = count[0].count - count[0].count%limit;
				limit = count[0].count%limit;
			}
			const products = await knex('products').where('name', 'like', `%${name}%`).select('id', 'name', 'description', 'price').orderBy([{ column: 'created_at', order: 'asc' },{ column: 'name', order: 'asc' }]).limit(limit).offset(offset);
			const pagination = `${products.length + offset}/${count[0].count}`;
			if(products.length > 0){
				return {status: true, data: products, pagination};
			}else{
				return {status: false, message: 'Nenhum produto encontrado'};
			}
		}catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}

	async update(id, name, description, price, sellerId){
		try {
			const product = await knex('products').where('id', id).select('id', 'name', 'description', 'price', 'sellerId');
			if(product.length > 0){
				if(product[0].sellerId == sellerId){
					const update = await knex('products').where('id', id).update({name, description, price});
					if(update){
						return {status: true, message: 'Produto atualizado com sucesso'};
					}else{
						return {status: false, message: 'Produto não foi atualizado'};
					}
				}else{
					return {status: false, message: 'Vendedor não autorizado'};
				}
			}else{
				return {status: false, message: 'Produto não encontrado'};
			}
		}catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
		}
	}

}

module.exports = Products;