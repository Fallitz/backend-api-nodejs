const Validator = require('../Validator')

const schema ={
    create: Validator.object().shape({
        email: Validator.string().required().email(),
        password: Validator.string().required().min(8),
        fullname: Validator.string().required().min(3),
        birth: Validator.string().required(),
        nickname: Validator.string().required().min(3).max(25),
        gender: Validator.mixed().required().oneOf(['Não informar', 'Masculino', 'Feminino', 'Outro']),
        type: Validator.mixed().required().oneOf(['Comprador', 'Vendedor', 'Entregador']),
    }),
} 

module.exports = schema