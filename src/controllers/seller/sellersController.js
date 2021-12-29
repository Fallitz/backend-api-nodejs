const sellerValidator = require('../../modules/http/validators/seller');
const Seller = require('../../models/seller/seller');

module.exports = {

async create(req, res){
        const data = req.body;
        sellerValidator.create.validate({...data}).then(async function (valid) {
            try {
                const user = new Seller(data);
                try {
                    const userRegistered = await user.create(...data, req.tokenData.id);
                    if(userRegistered.status){
                        return res.status(201).json({status: true, message: 'Usuário criado com sucesso', data: {user: userRegistered.user, acessToken: userRegistered.acessToken, refreshToken: userRegistered.refreshToken}});
                    }else{
                        return res.status(403).json({status: false, message: userRegistered.message, field: userRegistered.field});
                    }
                } catch (error) {
                    return res.status(400).json({status: false, message: userRegistered.message});
                }
            } catch (error) {
                res.status(500).json({status: false, message: error.message});
            }
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.errors[0], field: err.path});
        });
    },
}