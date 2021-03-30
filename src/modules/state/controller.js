const State = require('./model')
const stateSchema = require('./schema')
const logger = require('../../config/logger')
const verifyIdExist = require('../../utils/supportFuncion')
const RequestError = require('../../errors/RequestError')

module.exports = {
    async list (req, res) {
        logger.info('STATE CONTROLLER :: Initialing get all states')
        try {
            const { sortBy, orderBy, searchBy } = req.query

            const sort = {}
            sort[sortBy] = orderBy

            const search = searchBy ? { nome: searchBy } : {}

            const result = await State.find(search).sort(sort).lean().exec()

            res.json(result)

        } catch (error) {
            logger.error(`STATE CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.message || 'Error: Não foi possível listar os estados')
        }
    },

    async getById (req, res) {
        const stateId = req.query.id
        logger.info(`STATE CONTROLLER :: Initialing get state with id: ${stateId}`)
        try {
            verifyIdExist(stateId)

            const result = await State.findById(stateId).lean().exec()

            res.json(result)

        } catch (error) {
            logger.error(`STATE CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.message || `Error: Não foi possível listar o estado com id: ${stateId}`)
        }
    },

    async createState (req, res) {
        const body = req.body
        logger.info(`STATE CONTROLLER :: Initialing creation of state > ${JSON.stringify(body)}`)

        try {
            await stateSchema.validate(body)

            const state = new State(body)

            const result = await state.save()

            logger.info('STATE CONTROLLER :: State created with success')
            logger.debug(`STATE CONTROLLER :: State created >> ${result}`)

            res.status(201).json(result)

        } catch (error) {
            logger.error(`STATE CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.errors || 'Error: Não foi possível criar um estado')
        }
    },

    async updateById (req, res) {
        const stateId = req.query.id
        logger.info(`STATE CONTROLLER :: Initialing updation of state with id > ${stateId}`)
        logger.debug(`STATE CONTROLLER :: Initialing updation of state with body> ${JSON.stringify(req.body)}`)

        try {
            verifyIdExist(stateId)

            const { nome, abreviacao } = req.body

            const state = await State.findById(stateId).exec()

            await stateSchema.validate(req.body)

            state.nome = nome
            state.abreviacao = abreviacao

            const result = await state.save()

            logger.info('STATE CONTROLLER :: State updated with success')
            logger.debug(`STATE CONTROLLER :: State updated >> ${result}`)

            res.status(202).json(result)

        } catch (error) {
            logger.error(`STATE CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.errors || `Error: Não foi possível atualizar o estado com id: ${stateId}`)
        }
    },

    async deleteById (req, res) {
        const stateId = req.query.id
        logger.info(`STATE CONTROLLER :: Initialing deletion of state with id > ${stateId}`)

        try {
            verifyIdExist(stateId)

            await State.findByIdAndRemove(stateId).exec()

            logger.info('STATE CONTROLLER :: Deleted with success')

            res.send()
        } catch (error) {
            logger.error(`STATE CONTROLLER :: Error >> ${JSON.stringify(error)}`)

            res.status(error.status || 409)
                .json(error.errors || error.message || `Error: Não foi possível remover o estado com id: ${stateId}`)
        }
    },

    async verifyStateExist (stateId) {
        logger.info(`STATE CONTROLLER :: Verifying if state with id: ${stateId} exist`)

        const state = await State.findById(stateId).lean().exec()

        if (!state) throw new RequestError('Error: EstadoId não encontrado')
    }
}
