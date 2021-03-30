const yup = require('yup')

const citySchema = yup.object().shape({
    nome: yup
        .string()
        .required('Insira o campo nome')
        .min(2),
    estadoId: yup
        .string()
        .required('Insira o id de estado')
})

module.exports = citySchema
