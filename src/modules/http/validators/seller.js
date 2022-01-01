const Validator = require('../Validator')

const schema ={
    create: Validator.object().shape({
        name: Validator.string().required().min(3),
        description: Validator.string(),
        phone: Validator.string().required().min(13).max(14),
        address: Validator.object().required().shape({
            country: Validator.string().required().min(3),
            state: Validator.string().required().min(3),
            city: Validator.string().required().min(3),
            district: Validator.string().required().min(3),
            street: Validator.string().required().min(3),
            number: Validator.string().required().min(1),
            complement: Validator.string(),
            reference: Validator.string(),
            zipCode: Validator.string().required().min(8).max(8)	
        }), 
        nationalRegister: Validator.string().required().min(14).max(14),
        socialReason: Validator.string().required(3),
        type: Validator.string().required(),
        category: Validator.string().required(),
        acceptDeliver: Validator.boolean().required(),
        acceptWithdrawal: Validator.boolean().required(),
        avatar: Validator.string(),
    }),
    id: Validator.object().shape({
        id: Validator.string().required().min(36).max(36),
    }),
} 

module.exports = schema