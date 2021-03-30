const mongoose = require('../../config/database')
const { utcToZonedTime } = require('date-fns-tz')

const citySchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    estadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        require: true
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

module.exports = mongoose.model('City', citySchema)
