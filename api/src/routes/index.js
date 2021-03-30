const express = require('express')
const app = express()

const stateRoutes = require('../modules/state/routes')
const cityRoutes = require('../modules/city/routes')

app.use(stateRoutes)
app.use(cityRoutes)

module.exports = app
