const {Item,Supplier,SupplierItem} = require('../models')
const express = require ('express')
const router = express.Router()
const sequelize = require('sequelize')
const Op = sequelize.Op


router.get('/',(req,res)=>{
  res.render('search')
})

router.post('/itemresult',(req,res)=>{
    SupplierItem.findAll({
    where:{
        [Op.or]:[
            {price:{[Op.between]:[Number(req.body.min_value),Number(req.body.max_value)]}},
            {price:{[Op.gte] : Number(req.body.min_value)}},
            {price:{[Op.lte] : Number(req.body.max_value)}}]
    },
    include:[
        {model:Item, where :{name:{[Op.iLike]:`%${req.body.itemName}%`}}},
        {model:Supplier}]
    }).then(dataItems=>{
      if(dataItems.length !==0){
        res.render('searchItem',{dataItems:dataItems,helper:require('../helpers/rupiah.js')})
      }else{
        res.render('search')
      }
    }).catch(err=>{
      res.send(err)
    })
  })



module.exports = router;
