const Validator = require('../Validator')

const schema ={
    create: Validator.object().shape({
        name: Validator.string().required().min(3),
        address: Validator.array().required(),
        description: Validator.string(),
        nationalRegister: Validator.string().required().min(14).max(14),
        socialReason: Validator.string().required(3),
        type: Validator.string().required(),
        avatar: Validator.string(),
        category: Validator.string().required(),
        acceptDeliver: Validator.boolean().required(),
        acceptWithdrawal: Validator.boolean().required()
    }),
} 

module.exports = schema