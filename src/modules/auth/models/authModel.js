const knex = require('../../../config/database');
const Model = require('../../../repositories/models/model');
const util = require('../../../repositories/util/util');
const { v4: uuidv4 } = require('uuid');
var  timexe  =  require( 'timexe' );

class Auth extends Model{

    async authenticate({email, password}){
        try{
            const dbemail = await knex('users').where("email", email.toLowerCase()).select('id', 'password', 'active');
            if (dbemail.length > 0 && dbemail[0].active == 1) {
                const dbpassword = dbemail[0].password;
                const comparePassword = await util.comparePassword(password, dbpassword);
                if(comparePassword === true){   
                    const idToken = uuidv4();
                    const userId = {id: user.message.id, code: idToken};
                    const accessToken = await util.generateToken(userId, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m');
                    const refreshToken = await util.generateToken(userId, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d');         
                    return ({status: true, message: {id: dbemail[0].id, accessToken: accessToken, refreshToken: refreshToken}});
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
