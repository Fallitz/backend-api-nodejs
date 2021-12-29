const sellerValidator = require('../../modules/http/validators/seller');
const Seller = require('../../models/seller/seller');

module.exports = {

async create(req, res){
        const data = req.body;
        sellerValidator.create.validate({...data}).then(async function (valid) {
            try {
                const seller = new Seller();
                const sellerRegistered = await seller.create({...data, ownerId: req.tokenData.id});
                if(sellerRegistered.status){
                    return res.status(201).json({status: true, message: 'Loja criada com sucesso', data: {store: sellerRegistered.data}});
                }else{
                    return res.status(403).json({status: false, message: sellerRegistered.message, field: sellerRegistered.field});
                }             
            } catch (error) {
                console.log(error);
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },
}