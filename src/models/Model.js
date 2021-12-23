const knex = require('../config/database');
const { v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');
const pluralize = require('pluralize');

class Model {

    getModelName(){
        const name = this.constructor.name;
        return this.normalizeClassName(name);
    }

    normalizeClassName(classname){
        const nameOfClass = classname.toLowerCase();
        const namePluralized = pluralize(nameOfClass);
        return namePluralized;
    }

    async store(){
        const model = this.getModelName();
        const query = await knex(model).insert(this);
        return query[0];
    }

    async where(search, fields){
        const model = this.getModelName();
        const query = await knex(model).where(search).select(fields);
        return query;
    }

    async delete(id){
        const model = this.getModelName();
        const query = await knex(model).where({id}).del();
        if(query == 1){
            return true;
        }else{
            throw new Error('Id not found');
        }
    }

    async  update(where, fields){
        const model = this.getModelName();
        return await knex(model).update(fields).where(where);
    }    

    createId(email){
        const id = uuidv5(email, process.env.SECRET_TOKEN_FOR_ID_USER);
        return String(id);
    }
    
    async comparePassword (plainTextPassword, dbPassword){
        const match = await bcrypt.compare(`%3456$${plainTextPassword}&92@7`, dbPassword);
        return match;
    }

    async encriptPassword (password){
        const hash = await bcrypt.hashSync(`%3456$${password}&92@7`, 10);
        return hash;
    }

}

module.exports = Model