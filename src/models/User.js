const knex = require('../config/database')
const bcrypt = require('bcrypt')
const Mail = require('../services/Mail')
const Model = require('./Model')

class User extends Model{
    
    constructor(){
        super()
    }

    async store(data){
        try {
            const email = data.email.toLowerCase();
            const emailWasRegistered = await knex('users').where('email', email);
            if(emailWasRegistered.length > 0){
                return false;
            }else{
                const password = await this.encriptPassword(data.password);
                const userId = await knex('users').insert({...data, email, password});
                const user = await knex('users').where('id', userId[0]).select(['nickname', 'email', 'fullname', 'birth']);
                //const mail = new Mail("DevTube <transational@devtube.io>", "Welcome to DevTube", `Olá ${this.fullname}, Seja Bem Vindo ao <b>DevTube</b> !`);
                //await mail.send()
                return user[0];
            }
        } catch (error) {
            return error;
        }
    }

    async comparePassword (plainTextPassword, dbPassword){
        const match = await bcrypt.compare(`%3456$${plainTextPassword}&92@7`, dbPassword);
        return match;
    }

    async encriptPassword (password){
        const hash = await bcrypt.hashSync(`%3456$${password}&92@7`, 10);
        return hash;
    }

    async find(email, password){
        try {
            const user = knex('users').where({email});
            if(!user){
                throw new Error('E-Mail Not Found !');
            }
            const comparePassword = this.comparePassword(password, user.password);
            if(!comparePassword){
                throw new Error('Incorrect Password !');
            }
            return true;
        } catch (error) {
            throw new Error('Erro ao procurar e-mail');
        }
    }
    
}

module.exports = User