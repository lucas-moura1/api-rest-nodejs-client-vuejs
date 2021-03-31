const express = require('express')
const cors = require('cors')

const app = express()

const { PORT } = require('./config')
const loggerMiddleware = require('./middleware/logger')
const routes = require('./routes')

const port = PORT || 9090

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)
app.use(routes)

app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
})

app.use(function (err, req, res, next) {
    return res.status(err.statusCode).json({ error: err.message })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
