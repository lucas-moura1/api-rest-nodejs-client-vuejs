const mongoose = require('mongoose')
const { dataBaseUrl, dataBaseConfig } = require('./')

mongoose
    .connect(dataBaseUrl, dataBaseConfig)
    .then(console.log('DataBase connected'))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

module.exports = mongoose
