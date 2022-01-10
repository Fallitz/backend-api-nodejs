const productValidator = require('../../../repositories/http/validators/product');
const Product = require('../models/productModel');
const { validate: uuidValidate } = require('uuid');
const { get } = require('timexe');

module.exports = {

    async create(req, res){
        const data = req.body;
        productValidator.create.validate({...data}).then(async function () {
            try {
                const seller = new Seller();
                const sellerRegistered = await seller.create({...data, ownerId: req.tokenData.id});
                if(sellerRegistered.status){
                    return res.status(201).json({status: true, message: 'Loja criada com sucesso', data: {store: sellerRegistered.data}});
                }else{
                    return res.status(403).json({status: false, message: sellerRegistered.message, field: sellerRegistered.field});
                }             
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },

}