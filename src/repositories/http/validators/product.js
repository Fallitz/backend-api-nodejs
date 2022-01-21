const Validator = require('../Validator')

const schema ={
    create: Validator.object().shape({
        name: Validator.string().required().min(3),
        description: Validator.string().required(),
        category: Validator.string().required(),
        subcategory: Validator.string().required(),
        price: Validator.string().required(),
        stock: Validator.string().required(),
        avatar: Validator.string().required()
    }),
    id: Validator.object().shape({
        id: Validator.string().required().min(36).max(36),
    }),
    sellerId: Validator.object().shape({
        sellerId: Validator.string().required().min(36).max(36),
    }),
    search: Validator.object().shape({
        search: Validator.string().required().min(3)
    }),
} 

module.exports = schema