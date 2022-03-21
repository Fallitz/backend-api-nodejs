const cartValidator = require('../../../repositories/http/validators/cart');
var model = require('../../../config/modules');
//const util = require('../../../repositories/util/util');

module.exports = {
    
    async create(req, res){
        const data = req.body;
        cartValidator.create.validate({...data}).then(async function (){
                try 
                {
                    const cartModel = await model.Cart;
                    const cartCreated = await cartModel.create({...data, ownerId: req.tokenData.id});
                    if(cartCreated.status){
                        return res.status(201).json({status: true, message: 'Carrinho criado com sucesso', data: {cart: cartCreated.data}});
                    }else{
                        return res.status(403).json({status: false, message: cartCreated.message, field: cartCreated.field});
                    }
                }   
                catch (error) {
                    res.status(500).json({status: false, message: error.message });
                }
        }).catch(function (err) 
        {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },

    async toAdd(req, res){
        const data = req.body;
        cartValidator.toAdd.validate({...data}).then(async function (){
                try 
                {
                    const cartModel = await model.Cart;
                    const cart = await cartModel.toAdd(data);
                    res.json({status: true, message: 'Produto adicionado ao carrinho.', data: cart});
                }   
                catch (error) {
                    res.status(500).json({status: false, message: error.message });
                }
        }).catch(function (err) 
        {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },
}
