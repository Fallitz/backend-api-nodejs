const knex = require('../../config/database');
const Model = require('../Model');
const util = require('../util/util');

class Auth extends Model{

    async authenticate({email, password}) {
        try{
            const dbemail = await knex('users').where("email", email.toLowerCase()).select('id', 'password');
            if (JSON.stringify(dbemail[0]) != undefined && JSON.stringify(dbemail[0]) != null){
                const dbpassword = dbemail[0].password;
                const comparePassword = await util.comparePassword(password, dbpassword);
                if(comparePassword === true){            
                    return ({id: dbemail[0].id});
                }
                else{
                    return false;
                }
            } else{
                return false;
            }  
        }catch(error){
            return false;
        }
         
    }

    async login({id}){
        const dbemail = await knex('users').where("id", id).select('id','email', 'fullname', 'birth', 'nickname', 'type', 'updated_at');
        if(JSON.stringify(id) === JSON.stringify(dbemail[0].id)){
            return dbemail[0];
        }else{
            return false;
        }   
    }
    
    /* 
    async logout({id, token}){
        const dbToken = await knex('users').where("id", id).select("refresh_token");
        if(token === dbToken[0].refresh_token){
            await knex('users').where("id", id).update("refresh_token", null);
            return true;
        }else{
            return false;
        }
      
    }

  
   async refreshToken ({id, token}){
        const dbToken = await knex('users').where("id", id).select("refresh_token");
        if(token === dbToken[0].refresh_token){
            return true;
        }else{
            return false;
        }
    }

    async refreshToken_Update(user, refreshToken){
        await knex('users').where("id", user.id).update("refresh_token", refreshToken);
    }
    */
}

module.exports = Auth