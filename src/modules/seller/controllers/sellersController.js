const sellerValidator = require('../../../repositories/http/validators/seller');
var model = require('../../../config/modules');
const { validate: uuidValidate } = require('uuid');
const { get } = require('timexe');

module.exports = {

    async create(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user', 'admin']);
        if(roles){
            const data = req.body;
            sellerValidator.create.validate({...data}).then(async function () {
                try {
                    const sellerModel = await model.Seller;
                    const sellerRegistered = await sellerModel.create({...data, ownerId: req.tokenData.id});
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
        }else{
            res.status(403).json({status: false, message: 'Você não tem permissão para criar uma loja.'});
        }
    },

    async getSeller(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user', 'admin']);
        if(roles){
            const id = req.tokenData.id;
            if (!uuidValidate(id)){
                return res.status(403).json({status: false, message: 'ID inválido'});
            }
            sellerValidator.id.validate({id}).then(async function () {
                try {
                    const sellerModel = await model.Seller;
                    const sellerFound = await sellerModel.getByOwnerId(id);
                    if(sellerFound.status){
                        return res.status(200).json({status: true, data: sellerFound.data});
                    }else{
                        return res.status(403).json({status: false, message: sellerFound.message});
                    }             
                } catch (error) {
                    res.status(500).json({status: false, message: error.message});
                }
            }).catch(function (err) {
                res.status(500).json({status: false, message: err.errors[0], field: err.path});
            });
        }else{
            res.status(403).json({status: false, message: 'Você não tem permissão para acessar essa loja.'});
        }
    },
    
    async getSellerById(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user', 'admin']);
        if(roles){
            const id = req.body.id
            if (!uuidValidate(id)){
                return res.status(403).json({status: false, message: 'ID inválido'});
            }
            sellerValidator.id.validate({id}).then(async function () {
                try {
                    const sellerModel = await model.Seller;
                    const sellerFound = await sellerModel.getById(id)
                    if(sellerFound.status){
                        return res.status(200).json({status: true, data: sellerFound.data});
                    }else{
                        return res.status(403).json({status: false, message: sellerFound.message});
                    }             
                } catch (error) {
                    res.status(500).json({status: false, message: error.message});
                }
            }).catch(function (err) {
                res.status(500).json({status: false, message: err.errors[0], field: err.path});
            });
        }else{
            res.status(403).json({status: false, message: 'Você não tem permissão para acessar essa loja.'});
        }
    },

    async listSellers(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user', 'admin']);
        if(roles){
            try {
                const sellerModel = await model.Seller;
                const sellers = await sellerModel.listSellers(req.params.lim ?? 10, req.params.skip ?? 0);
                if(sellers.status){
                    return res.status(200).json({status: true, data: sellers.data, pagination: sellers.pagination});
                }else{
                    return res.status(403).json({status: false, message: sellers.message});
                }             
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }else{
            res.status(403).json({status: false, message: 'Você não tem permissão para acessar essa loja.'});
        }
    },

    async searchSellers(req, res){
        const roles = await authenticateRoles( req.tokenData.role, ['user', 'admin']);
        if(roles){
            const data = req.body;
            sellerValidator.search.validate({...data}).then(async function () {
                try {
                    const sellerModel = await model.Seller;
                    const sellers = await sellerModel.searchSellers(data.search, req.query.limit ?? 10, req.query.offset ?? 0);
                    if(sellers.status){
                        return res.status(200).json({status: true, data: sellers.data});
                    }else{
                        return res.status(403).json({status: false, message: sellers.message});
                    }             
                } catch (error) {
                    res.status(500).json({status: false, message: error.message});
                }
            }).catch(function (err) {
                res.status(500).json({status: false, message: err.errors[0], field: err.path});
            });
        }else{
            res.status(403).json({status: false, message: 'Você não tem permissão para acessar essa loja.'});
        }
    },
}
