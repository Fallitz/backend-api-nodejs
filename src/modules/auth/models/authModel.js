const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const util = require('../../../repositories/util/util');
var  timexe  =  require( 'timexe' );

class Auth extends Model{

    async authenticate({email, password}) {
        try{
            const dbemail = await knex('users').where("email", email.toLowerCase()).select('id', 'password', 'active');
            if (dbemail.length > 0 && dbemail[0].active == 1) {
                const dbpassword = dbemail[0].password;
                const comparePassword = await util.comparePassword(password, dbpassword);
                if(comparePassword === true){            
                    return ({status: true, message: {id: dbemail[0].id}});
                }
                else{
                    return {status: false};
                }
            } else{
                return {status: false};
            }  
        }catch(error){
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }

    /*async login(data){
        try{
            const result = await knex('users').where("id", data.id).select('id','email', 'fullname', 'birth', 'nickname', 'lastAcess_at');
            if(result.length > 0){
                return {status: true, message: result[0]};
            }else{
                return {status: false, message: 'Usuário não encontrado'};
            }
        }catch(error){
            return {status: false, message: error.sqlMessage ?? error.message};
        }
          
    }*/
    
    async logout(token){
        try{
            const tokenInsert = await knex('tokens').insert({token, created_at: knex.fn.now()});  
            if(tokenInsert.length > 0 || tokenInsert > 0){         
                return {status: true};
            }else{
                return {status: false, message: 'Erro ao deslogar'};
            }
        }catch(error){
            return {status: false, message: error.sqlMessage ?? error.message};
        }
    }

    async removeTokensInvalid(){
        const validade = new Date(Date.now() - (1000* 60 * 20)); // 20 minutos
        await knex('tokens').where('created_at', '<', validade).del();
    }
        
}
// * * * 0-23 / 1
//* * w1-7 / 3
const loopTime = new Auth();
var  res1 = timexe ("* * w1-7 / 3" ,  function ( ) { loopTime.removeTokensInvalid()} ) ; //A CADA 3 HORAS REMOVE OS TOKENS DO BANCO DE DADOS

module.exports = Auth
