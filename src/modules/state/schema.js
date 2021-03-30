const yup = require('yup')

const stateSchema = yup.object().shape({
    nome: yup
        .string()
        .required('Insira o campo nome')
        .min(2),
    abreviacao: yup
        .string()
        .strict(true)
        .required('Insira o campo abreviacao')
        .length(2, 'O campo abreviacao deve conter apenas duas letras')
        .uppercase('Insira o campo abreviacao com letra maiúscula')
})

module.exports = stateSchema
