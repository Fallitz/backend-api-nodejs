const Validator = require('../Validator')

const schema = {
    auth:
        Validator.object().shape({
        email: Validator.string().required().email(),
        password: Validator.string().required().min(8)
    }),

    /*
    teste:
        Validator.object().shape({
        fullname: Validator.string().required().min(3),
        birth: Validator.string().required(),
    })*/
}


module.exports = schema