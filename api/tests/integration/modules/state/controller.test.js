jest.mock('../../../../src/modules/state/schema')
const mockStateSchema = require('../../../../src/modules/state/schema')

const StateModel = require('../../../../src/modules/state/model')
const stateController = require('../../../../src/modules/state/controller')

jest.mock('../../../../src/utils/supportFuncion')
const verifyIdExist = require('../../../../src/utils/supportFuncion')

const mongoose = require('mongoose')
const { dataBaseUrl, dataBaseConfig } = require('../../../../src/config')


describe('Test State Controller', () => {

    beforeAll(async () => {
        await mongoose.connect(dataBaseUrl, dataBaseConfig)
    })

    beforeEach(() => StateModel.deleteMany())

    afterEach(() => StateModel.deleteMany())

    afterAll(async () => { await mongoose.connection.close() })

    const requestMock = ( stateObject = {}, sortBy=null, orderBy=null, searchBy=null, id=null) => {
        return {
            body: {
                ...stateObject
            },
            query: {
                sortBy, orderBy, searchBy, id
            }
        }
    }

    const responseMock = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        res.end = jest.fn().mockReturnValue(res);
        return res;
    }

    test('Test list all states', async () => {
        const req = requestMock()

        const res = responseMock()

        const states = await StateModel.find().lean().exec()

        await stateController.list(req, res)

        expect(states).toHaveLength(0)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test get a state by Id', async () => {
        const body = {
            nome: 'Rio de Janeiro',
            abreviacao: 'RH'
        }

        const state = await new StateModel(body).save()

        const stateId = state._id

        const req = requestMock({}, null, null, null, stateId)
        const res = responseMock()

        verifyIdExist.mockReturnValue(undefined)

        await stateController.getById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test create one state', async () => {
        const body = {
            nome: 'Rio de Janeiro',
            abreviacao: 'RJ'
        }

        const req = requestMock(body)
        const res = responseMock()

        await mockStateSchema.validate.mockResolvedValue(body)

        await stateController.createState(req, res)

        expect(mockStateSchema.validate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test update one state', async () => {
        let body = {
            nome: 'Rio de Janeiro',
            abreviacao: 'RH'
        }

        const state = await new StateModel(body).save()

        body = {
            nome: 'Rio de Janeiro',
            abreviacao: 'RJ'
        }

        const stateId = state._id

        const req = requestMock(body, null, null, null, stateId)
        const res = responseMock()

        verifyIdExist.mockReturnValue(undefined)

        await mockStateSchema.validate.mockResolvedValue(body)

        await stateController.updateById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(mockStateSchema.validate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test delete one state', async () => {
        const body = {
            nome: 'Rio de Janeiro',
            abreviacao: 'RJ'
        }

        const state = await new StateModel(body).save()

        const stateId = state._id

        const req = requestMock({}, null, null, null, stateId)
        const res = responseMock()

        verifyIdExist.mockReturnValue(undefined)

        await stateController.deleteById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(res.send).toHaveBeenCalled()
    })

})

