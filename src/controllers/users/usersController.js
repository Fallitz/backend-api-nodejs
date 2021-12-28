const UserValidator = require('../../modules/http/validators/user');
const User = require('../../models/user/user');

module.exports = {

    async create(req, res){
        const data = req.body;
        UserValidator.create.validate({...data}).then(async function (valid) {
            try {
                const user = new User(data);
                try {
                    const userRegistered = await user.create(data);
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

    async getUser(req, res){
      
        try {
            const userModel = new User();
            const user = await userModel.getUser(req.tokenData.id);
            if(user.status){
                return res.status('200').json({status: true, data: user.message});
            }else{
                return res.status('403').json({status: false, message: user.message});
            }
            
        } catch (error) {
            throw error;
        }   
       
    },
    
    /*
    async update(req, res){
        try {
            const userModel = new User();
            const user_id = req.params.id;
            const {email, fullname, birth, nickname} = req.body;

            if(email) {
                updateUserEmail(user_id, email, res);
            }

            if(nickname) {
                updateUserNickname(user_id, nickname, res);
            }

            // Get user logged id e select your type (user, admin ...)
            const userAuthenticated = req.tokenData.id;
            const getType = await userModel.where({id: userAuthenticated}, ['type']);
            // Cheks if the user logged is admin or if the user id that will be deleted is equal to logged
            if(getType == 'admin' || userAuthenticated == user_id){
                try {
                    const userModel = new User();
                    await userModel.update({id: user_id}, {fullname, birth});
                    return res.status(200).json({message: "User Updated", data: {user: user_id}});
                } catch (error) {
                    return res.status(404).json({message: error.message});
                }
            }else{
                return res.status(500).json({message: 'Permission denied'});
            }  

        } catch (error) {
            return res.status(500).json({message: error.message});
        } 
    },

  
    async delete(req, res){
        try {
            const userModel = new User();
            const {user_id} = req.body;

            //Get user logged id e select your type (user, admin ...)
            const userAuthenticated = req.tokenData.id;
            const getType = await userModel.where({id: userAuthenticated}, ['type']);

            // Cheks if the user logged is admin or if the user id that will be deleted is equal to logged
            if(getType == 'admin' || userAuthenticated == user_id){
                try {
                    const userModel = new User();
                    await userModel.delete(user_id);
                    return res.status(200).json({message: "User deleted", data: {user_id}});
                } catch (error) {
                    return res.status(404).json({message: error.message});
                }
            }else{
                return res.status(500).json({message: 'Permission denied'});
            }  

        } catch (error) {
            return res.status(500).json({message: error.message});
        } 
    },*/

}

/*
async function updateUserEmail(user_id, email, res){
    //check if email has been registered
    const userModel = new User();
    const emailRegistred =  await userModel.where({email}, ['email']);
    if(emailRegistred.length >= 1){
        return res.status(500).json({message: 'E-mail já registrado'});
    }else{
        await userModel.update({id: user_id}, {email});
        return true;
    }
}

async function updateUserNickname(user_id, nickname, res){
    //check if nickname has been registered
    const userModel = new User();
    const nicknameRegistered =  await userModel.where({nickname}, ['nickname']);
    if(nicknameRegistered.length >= 1){
        return res.status(500).json({message: 'Nickname já registrado'});
    }else{
        await userModel.update({id: user_id}, {nickname});
        return true;
    }
}
    */