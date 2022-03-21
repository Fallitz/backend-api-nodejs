const Validator = require('../../../../repositories/http/Validator')

const schema ={
    create: Validator.object().shape({
    }),
} 

module.exports = schema