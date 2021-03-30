const stateSchema = require('../../../../src/modules/state/schema')

describe('Test validate State Schema', () => {
    test('Test validation with success ', async () => {
        const body = {
            nome: 'Acre',
            abreviacao: 'AC'
        }

        const responseValidateSchema = await stateSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['nome'], 'Acre')
        await expect(responseValidateSchema).toHaveProperty(['abreviacao'], 'AC')
    })

    test('Test validation with upperCase error ', async () => {
        const body = {
            nome: 'Acre',
            abreviacao: 'ac'
        }

        await expect(stateSchema.validate(body)).rejects.toThrow('Insira o campo abreviacao com letra maiúscula')
    })

    test('Test validation with error on format of abreviacao field', async () => {
        const body = {
            nome: 'Acre',
            abreviacao: 'ACC'
        }

        await expect(stateSchema.validate(body)).rejects.toThrow('O campo abreviacao deve conter apenas duas letras')
    })

    test('Test validation with error on format without abreviacao field', async () => {
        const body = {
            nome: 'Acre'
        }

        await expect(stateSchema.validate(body)).rejects.toThrow('Insira o campo abreviacao')
    })

    test('Test validation with error on format without nome field', async () => {
        const body = {
            abreviacao: 'AC'
        }

        await expect(stateSchema.validate(body)).rejects.toThrow('Insira o campo nome')
    })
})
