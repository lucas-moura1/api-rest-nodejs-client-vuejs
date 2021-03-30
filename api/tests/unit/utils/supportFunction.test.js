const RequestError = require('../../../src/errors/RequestError')
const verifyIdExist = require('../../../src/utils/supportFuncion')


describe('Test support function', () => {

    test('Test verifyIdExist function with success', () => {
        const id = "cityState123"

        const result = verifyIdExist(id)

        expect(result).toBeUndefined()
    })

    test('Test verifyIdExist function with error', () => {
        const id = null

        expect(() => verifyIdExist(id)).toThrow()
    })
})
