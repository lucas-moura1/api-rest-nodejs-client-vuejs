const mongoose = require('../../config/database')
const { utcToZonedTime } = require('date-fns-tz')

const stateSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    abreviacao: {
        type: String,
        require: true,
        unique: true
    }
},
{
    versionKey: false,
    timestamps: {
        createdAt: 'dataCriacao',
        updatedAt: 'dataAtualizacao',
        currentTime: () => utcToZonedTime(new Date(), 'America/Sao_Paulo')
    }
}
)

module.exports = mongoose.model('State', stateSchema)
