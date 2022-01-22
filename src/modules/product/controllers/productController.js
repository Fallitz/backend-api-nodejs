const { search } = require('../../../repositories/http/validators/product');
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
        const data = req.body;
        if (!uuidValidate(data.id)){
            return res.status(403).json({status: false, message: 'ID inválido'});
        }
        productValidator.id.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const productFound = await product.getById(data.id);
                if(productFound.status){
                    return res.status(200).json({status: true, message: 'Produto encontrado', data: {product: productFound.data}});
                }else{
                    return res.status(403).json({status: false, message: productFound.message});
                }
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });   
    },

    async getBySellerId(req, res){
        const data = req.body;
        if (!uuidValidate(data.sellerId)){
            return res.status(403).json({status: false, message: 'ID inválido'});
        }
        productValidator.sellerId.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const products = await product.getBySellerId(data.sellerId, req.params.lim ?? 10, req.params.skip ?? 0);
                if(products.status){
                    return res.status(200).json({status: true, message: 'Produtos encontrados', data: {products: products.data, pagination: products.pagination}});
                }else{
                    return res.status(403).json({status: false, message: products.message});
                }
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }   
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });   
    },

    async getByCategoryId(req, res){
        const data = req.body;
        // if (!uuidValidate(data.sellerId)){
            // return res.status(403).json({status: false, message: 'ID inválido'});
        // }
        productValidator.categoriaId.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const productsFound = await product.getByCategoryId(data.categoryId, req.params.lim ?? 10, req.params.skip ?? 0);
                if(productsFound.status){
                    return res.status(200).json({status: true, message: 'Produtos encontrados', data: {products: productsFound.data}});
                }else{
                    return res.status(403).json({status: false, message: productsFound.message});
                }
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }  
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });  
    },

    async listProducts(req, res){
        try {
            const product = new Product();
            const products = await product.listProducts(req.params.lim ?? 10, req.params.skip ?? 0);
            if(products.status){
                return res.status(200).json({status: true, data: products.data, pagination: products.pagination});
            }else{
                return res.status(403).json({status: false, message: products.message});
            }
        } catch (error) {
            res.status(500).json({status: false, message: error.message});
        }
    },

    async searchProduct(req, res){
        const data = req.body;
        search.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const productsFound = await product.searchProduct({...data, ownerId: req.tokenData.id});
                if(productsFound.status){
                    return res.status(200).json({status: true, message: 'Produtos encontrados', data: {products: productsFound.data}});
                }else{
                    return res.status(403).json({status: false, message: productsFound.message});
                }
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    }

}