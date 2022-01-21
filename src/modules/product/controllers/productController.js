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
        const id = req.body.id;
        productValidator.id.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const productFound = await product.getById(id);
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
        const sellerId = req.body.sellerId;
        productValidator.sellerId.validate({...data}).then(async function () {
            try {
                const product = new Product();
                const products = await product.getBySellerId(sellerId, req.params.lim ?? 10, req.params.skip ?? 0);
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
        const categoryId = req.body.categoryId;
        try {
            const product = new Product();
            const productsFound = await product.getByCategoryId(categoryId, req.params.lim ?? 10, req.params.skip ?? 0);
            if(productsFound.status){
                return res.status(200).json({status: true, message: 'Produtos encontrados', data: {products: productsFound.data}});
            }else{
                return res.status(403).json({status: false, message: productsFound.message});
            }
        } catch (error) {
            res.status(500).json({status: false, message: error.message});
        }
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