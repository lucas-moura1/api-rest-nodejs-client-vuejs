const stateSchema = require('../../../../src/modules/city/schema')

describe('Test validate State Schema', () => {
    test('Test validation with success ', async () => {
        const body = {
            nome: 'Rio de Janeiro',
            estadoId: 'objectId1324'
        }

        const responseValidateSchema = await stateSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['nome'], 'Rio de Janeiro')
        await expect(responseValidateSchema).toHaveProperty(['estadoId'], 'objectId1324')
    })

    test('Test validation with error on format without abreviacao field', async () => {
        const body = {
            nome: 'Rio de Janeiro'
        }

        await expect(stateSchema.validate(body)).rejects.toThrow('Insira o id de estado')
    })

    test('Test validation with error on format without nome field', async () => {
        const body = {
            estadoId: 'objectId1324'
        }

        await expect(stateSchema.validate(body)).rejects.toThrow('Insira o campo nome')
    })
})
