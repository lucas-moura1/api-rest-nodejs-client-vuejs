class RequestError extends Error {

    constructor (error, statusCode) {
        super(error || 'Erro na requisição')
        this.statusCode = statusCode || 409
    }
}

module.exports = RequestError
