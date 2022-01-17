const productValidator = require('../../../repositories/http/validators/product');
const Product = require('../models/productModel');

module.exports = {

    async create(req, res){
        const data = req.body;
        productValidator.create.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const productRegistered = await product.create({...data, ownerId: req.tokenData.id});
                if(productRegistered.status){
                    return res.status(201).json({status: true, message: 'Produto criado com sucesso', data: {store: productRegistered.data}});
                }else{
                    return res.status(403).json({status: false, message: productRegistered.message, field: productRegistered.field});
                }             
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },

    async getById(req, res){
        const id = req.params.id;
        try {
            const product = new Product();
            const productFound = await product.getById(id);
            if(productFound.status){
                return res.status(200).json({status: true, message: 'Produto encontrado', data: {product: productFound.data}});
            }else{
                return res.status(404).json({status: false, message: productFound.message});
            }
        } catch (error) {
            res.status(500).json({status: false, message: error.message});
        }
    }

}