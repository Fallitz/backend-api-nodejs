const knex = require('../../config/database');
const Model = require('../Model');
const util = require('../util/util');
var  timexe  =  require ( 'timexe' ) ;

class Auth extends Model{

    async authenticate({email, password}) {
        try{
            const dbemail = await knex('users').where("email", email.toLowerCase()).select('id', 'password', 'active');
            if (dbemail.length > 0 && dbemail[0].active == 1) {
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

    async login(data){
        const result = await knex('users').where("id", data.id).select('id','email', 'fullname', 'birth', 'nickname', 'type', 'updated_at');
        if(result.length > 0){
            return result[0];
        }else{
            return false;
        }  
    }
    
    async logout(token){
        const tokenInsert = await knex('tokens').insert({token, created_at: knex.fn.now()});  
        if(tokenInsert.length > 0 || tokenInsert > 0){         
            return true;
        }else{
            return false;
        }
    }

    async removeTokensInvalid(){
        const validade = new Date(Date.now() - (1000* 60 * 20)); // 20 minutos
        var result = await knex('tokens').where('created_at', '<', validade).del();
        if(result > 0){
            console.log(result + ' Tokens invalidos removidos');}
        else{  console.log('Nenhum token removido');}
    }
        
}
// * * * 0-23 / 1
//* * w1-7 / 3
const loopTime = new Auth();
var  res1 = timexe ("* * w1-7 / 3" ,  function ( ) { loopTime.removeTokensInvalid()} ) ; //A CADA 3 HORAS REMOVE OS TOKENS DO BANCO DE DADOS

module.exports = Auth
