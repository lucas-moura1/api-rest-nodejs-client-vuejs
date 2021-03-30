const express = require('express')
const router = express.Router()

const stateController = require('./controller')

router.get('/estados', stateController.list)
router.get('/estado', stateController.getById)
router.post('/estado', stateController.createState)
router.put('/estado', stateController.updateById)
router.delete('/estado', stateController.deleteById)

module.exports = router
