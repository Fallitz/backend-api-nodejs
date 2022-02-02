const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const { v4: uuidv4 } = require('uuid');

class Cart extends Model{
    async create({data}){
        try {
			const cartWasRegistered = await knex('cart').where('ownerId', data.ownerId).select('id');
			if(cartWasRegistered.length > 0){
				const id = uuidv4();
				delete data.ownerId;
				const product = await knex('products').insert({...data, id, sellerId: cartWasRegistered[0].id}).then(() => {return knex ('products').where('id', id).select('name')});
				if(product.length > 0){
					return {status: true, data: product[0]};
				}else{
					return {status: false, message: 'Carrinho não foi criado'};
				}
			}else{
				return {status: false, message: 'Loja não cadastrada', field: 'ownerId'};
			}
        }catch (error) {
			return {status: false, message: error.sqlMessage ?? error.message};
        }
    }	
	
    async toAdd(data){
        try {
            const product = await knex('products').where('id', data.productId).select('id', 'name', 'price');
            if(product.length > 0){
                const cart = await knex('carts').where('productId', data.productId).select('id');
                if(cart.length > 0){
                    const update = await knex('carts').where('id', cart[0].id).update({quantity: data.quantity});
                    if(update){
                        return {status: true, data: product[0]};
                    }else{
                        return {status: false, message: 'Produto não foi adicionado ao carrinho'};
                    }
                }else{
                    const id = uuidv4();
                    const insert = await knex('carts').insert({id, productId: product[0].id, quantity: data.quantity});
                    if(insert){
                        return {status: true, data: product[0]};
                    }else{
                        return {status: false, message: 'Produto não foi adicionado ao carrinho'};
                    }
                }
            }else{
                return {status: false, message: 'Produto não encontrado'};
            }
        }catch (error) {
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }
	

}

module.exports = Cart;