jest.mock('../../../../src/modules/city/schema')
const mockCitySchema = require('../../../../src/modules/city/schema')

const CityModel = require('../../../../src/modules/city/model')
const StateModel = require('../../../../src/modules/state/model')
const cityController = require('../../../../src/modules/city/controller')

jest.mock('../../../../src/utils/supportFuncion')
const verifyIdExist = require('../../../../src/utils/supportFuncion')

const mongoose = require('mongoose')
const { dataBaseUrl, dataBaseConfig } = require('../../../../src/config')

const createState = async () => {
    const body = {
        nome: 'Rio de Janeiro',
        abreviacao: 'RJ'
    }

    const state = await new StateModel(body).save()

    return state
}

describe('Test City Controller', () => {

    beforeAll(async () => {
        await mongoose.connect(dataBaseUrl, dataBaseConfig)
    })

    beforeEach(async () => await mongoose.connection.dropDatabase())

    afterEach(async () => await mongoose.connection.dropDatabase())

    afterAll(async () => { await mongoose.connection.close() })

    const requestMock = ( cityObject = {}, sortBy=null, orderBy=null, searchBy=null, id=null) => {
        return {
            body: {
                ...cityObject
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

    test('Test list all cities', async () => {
        const req = requestMock()

        const res = responseMock()

        const cities = await CityModel.find().lean().exec()

        await cityController.list(req, res)

        expect(cities).toHaveLength(0)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test get a city by Id', async () => {
        const state = await createState()
        const body = {
            nome: 'Rio de Janeiro',
            estadoId: state._id
        }

        const city = await new CityModel(body).save()

        const cityId = city._id

        const req = requestMock({}, null, null, null, cityId)
        const res = responseMock()

        verifyIdExist.mockReturnValue(undefined)

        await cityController.getById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test create one city', async () => {
        const state = await createState()
        const body = {
            nome: 'Rio de Janeiro',
            estadoId: state._id
        }

        const req = requestMock(body)
        const res = responseMock()

        await mockCitySchema.validate.mockResolvedValue(body)

        await cityController.createCity(req, res)

        expect(mockCitySchema.validate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test update one city', async () => {
        const state = await createState()

        let body = {
            nome: 'Rio de Janeiroo',
            estadoId: state._id
        }

        const city = await new CityModel(body).save()

        body = {
            nome: 'Rio de Janeiro',
            estadoId: state._id
        }

        const cityId = city._id

        const req = requestMock(body, null, null, null, cityId)
        const res = responseMock()

        verifyIdExist.mockReturnValue(undefined)

        await mockCitySchema.validate.mockResolvedValue(body)

        await cityController.updateById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(mockCitySchema.validate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test delete one city', async () => {
        const state = await createState()
        const body = {
            nome: 'Rio de Janeiro',
            estadoId: state._id
        }

        const city = await new CityModel(body).save()

        const cityId = city._id

        const req = requestMock({}, null, null, null, cityId)
        const res = responseMock()

        verifyIdExist.mockReturnValue(undefined)

        await cityController.deleteById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(res.send).toHaveBeenCalled()
    })

})

