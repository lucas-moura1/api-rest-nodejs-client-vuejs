const City = require('./model')
const citySchema = require('./schema')
const logger = require('../../config/logger')
const verifyIdExist = require('../../utils/supportFuncion')
const { verifyStateExist } = require('../state/controller')

module.exports = {
    async list (req, res) {
        logger.info('CITY CONTROLLER :: Initialing get all city')
        try {
            const { sortBy, orderBy, searchBy } = req.query

            const sort = {}
            sort[sortBy] = orderBy

            const search = searchBy ? { nome: searchBy } : {}

            const result = await City.find(search).sort(sort).populate('estadoId').lean().exec()

            res.json(result)

        } catch (error) {
            logger.error(`CITY CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.message || 'Error: Não foi possível listar as cidades')
        }
    },

    async getById (req, res) {
        const cityId = req.query.id
        logger.info(`CITY CONTROLLER :: Initialing get city with id: ${cityId}`)
        try {
            verifyIdExist(cityId)

            const result = await City.findById(cityId).populate('estadoId').lean().exec()

            res.json(result)

        } catch (error) {
            logger.error(`CITY CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.message || `Error: Não foi possível listar o estado com id: ${cityId}`)
        }
    },

    async createCity (req, res) {
        const body = req.body
        logger.info(`CITY CONTROLLER :: Initialing creation of city > ${JSON.stringify(body)}`)

        try {
            await citySchema.validate(body)

            await verifyStateExist(body.estadoId)

            const city = new City(body)

            const result = await city.save()

            logger.info('CITY CONTROLLER :: city created with success')
            logger.debug(`CITY CONTROLLER :: city created >> ${result}`)

            res.status(201).json(result)

        } catch (error) {
            logger.error(`CITY CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.errors || 'Error: Não foi possível criar uma cidade')
        }
    },

    async updateById (req, res) {
        const cityId = req.query.id
        logger.info(`CITY CONTROLLER :: Initialing updation of city with id > ${cityId}`)
        logger.debug(`CITY CONTROLLER :: Initialing updation of city with body> ${JSON.stringify(req.body)}`)

        try {
            verifyIdExist(cityId)

            const { nome, estadoId } = req.body

            await verifyStateExist(estadoId)

            const city = await City.findById(cityId).exec()

            await citySchema.validate(req.body)

            city.nome = nome
            city.estadoId = estadoId

            const result = await city.save()

            logger.info('CITY CONTROLLER :: city updated with success')
            logger.debug(`CITY CONTROLLER :: city updated >> ${result}`)

            res.status(202).json(result)

        } catch (error) {
            logger.error(`CITY CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.errors || `Error: Não foi possível atualizar a cidade com id: ${cityId}`)
        }
    },

    async deleteById (req, res) {
        const cityId = req.query.id
        logger.info(`CITY CONTROLLER :: Initialing deletion of city with id > ${cityId}`)

        try {
            verifyIdExist(cityId)

            await City.findByIdAndRemove(cityId).exec()

            logger.info('CITY CONTROLLER :: Deleted with success')

            res.send()
        } catch (error) {
            logger.error(`CITY CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.errors || error.message || `Error: Não foi possível remover a cidade com id: ${cityId}`)
        }

    }
}
