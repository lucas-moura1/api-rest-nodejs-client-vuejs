const express = require('express')
const router = express.Router()

const cityController = require('./controller')

router.get('/cidades', cityController.list)
router.get('/cidade', cityController.getById)
router.post('/cidade', cityController.createCity)
router.put('/cidade', cityController.updateById)
router.delete('/cidade', cityController.deleteById)

module.exports = router
