const { v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');
//const Model = require('./Model');

class Util {

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
module.exports = Util