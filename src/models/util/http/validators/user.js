const Validator = require('../Validator')

const schema = {
    async create(){
        Validator.object().shape({
        email: Validator.string().required().email(),
        password: Validator.string().required().min(8),
        fullname: Validator.string().required().min(3),
        birth: Validator.string().required(),
        nickname: Validator.string().required().min(3).max(25),
        });
    }
}

module.exports = schema