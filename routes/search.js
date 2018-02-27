const express = require('express');
const app = express();
const router = express.Router()
const Op = require('sequelize').Op
const models = require('../models')

router.get('/',function(req,res){
  // res.send('Search')
  models.SupplierItem.findAll({
    include:[models.Item,models.Supplier]
  }).then(function(data){
    // res.send(data)
    res.render('search/search',{list:data})
  })
})

router.post('/',function(req,res){
  let search = req.body.search
  // console.log('=======',search)
  models.SupplierItem.findAll({where:{
    price:{[Op.between]:[req.body.minprice,req.body.maxprice]}
  },
include:[{model:models.Item,where:{name:{[Op.iLike]:`%${search}%`}}},models.Supplier]})
.then(detail=>{
  res.render('search/result',{list:detail})
  // res.send(detail)
})
})

module.exports = router