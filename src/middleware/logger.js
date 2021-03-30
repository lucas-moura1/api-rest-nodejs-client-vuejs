const logger = require('../config/logger')
const { v4: uuidv4 } = require('uuid')

const loggerMiddleware = (req, res, next) => {
    logger.requestId = uuidv4()
    logger.method = req.method

    next()
}

module.exports = loggerMiddleware
