const RequestError = require('../errors/RequestError')

const verifyIdExist = (id) => {
    if (!id) throw new RequestError('Error: Insira o id da entidade')
}

module.exports = verifyIdExist
