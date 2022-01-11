const productValidator = require('../../../repositories/http/validators/product');
const Product = require('../models/productModel');
const { validate: uuidValidate } = require('uuid');
const { get } = require('timexe');

module.exports = {

    /*async create(req, res){
        const data = req.body;
        productValidator.create.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const productRegistered = await product.create({...data, ownerId: req.tokenData.id});
                if(productRegistered.status){
                    return res.status(201).json({status: true, message: 'Loja criada com sucesso', data: {store: productRegistered.data}});
                }else{
                    return res.status(403).json({status: false, message: productRegistered.message, field: productRegistered.field});
                }             
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },*/

}