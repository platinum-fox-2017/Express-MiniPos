'use strict'
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('../views/homepage/homePage.ejs')
})

router.use('/suppliers', require('./suppliers'))
router.use('/items', require('./items'))

module.exports = router;