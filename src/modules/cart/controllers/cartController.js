const cartValidator = require('../../../repositories/http/validators/cart');
const Cart = require('../models/cartModel');
const util = require('../../../repositories/util/util');

module.exports = {
    
    async create(req, res){
        const data = req.body;
        cartValidator.create.validate({...data}).then(async function (){
                try 
                {
                   /* const modelUser = new Auth();
                    const user = await modelUser.authenticate(data);
                    if(user.status){
                        res.json({status: true, message: 'Bem-vindo de volta!', data:{ accessToken: user.message.accessToken, refreshToken: user.message.refreshToken}});
                    }else{
                        res.status(403).json({status: false, message: 'E-mail e/ou senha estão incorretos.'}) ;
                    }*/
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
