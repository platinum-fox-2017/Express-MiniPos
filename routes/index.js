const express = require('express')
const router = express.Router()
const Controller = require('../controller/index.js').Controller

router.use('/suppliers', require('./supplierRoute.js'))
router.use('/items', require('./itemRoute.js'))

router.get('/', Controller.home)

module.exports = router;
