const express       = require('express')
const router        = express.Router()
const Model         = require('../models')
const Item          = Model.Item
const Supplier_Item = Model.Supplier_Item
const Supplier      = Model.Supplier
const format        = require('../helpers/helper')


router.get('/', (req, res) => {
  Supplier_Item.findAll({
    include: [ Item, Supplier ],
  })
  .then(joinedData => {
    res.render('search',{joinedData})
  })
})

// router.post('/search', (req, res) => {
//
// })

module.exports = router;
