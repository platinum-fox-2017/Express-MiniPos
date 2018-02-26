const {Item} = require('../models')
const express = require ('express')
const router = express.Router()

router.get('/',(req,res)=>{
  Item.findAll({
    order:[['id','ASC']]
  }).then(dataItems=>{
    // res.send(dataItems)
    res.render('items',{dataItems:dataItems})
  })
})


module.exports = router;
