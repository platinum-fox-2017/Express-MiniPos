const express = require('express')
const router = express.Router()
const op = require('sequelize').Op
const {item,supplier,supplierItem} = require('../models')

router.get('/',(req,res)=>{
    supplierItem.findAll({include:[item,supplier]}).then(data=>{
        res.render('search',{
            data:data,
            helper : require('../helper/help')
        })
    })
})

router.post('/',(req,res)=>{
    let min = Number(req.body.minPrice)
    let max = Number(req.body.maxPrice)
    let search = req.body.search
    supplierItem.findAll({
    where:{
        [op.or]:[
            {price:{[op.between]:[min,max]}},
            {price:{[op.gte] : min}},
            {price:{[op.lte] : max}}]
    },
    include:[
        {model:item, where :{name:{[op.iLike]:`%${search}%`}}},
        {model:supplier}]
    }).then(data=>{
        res.render('search',{
            data:data,
            helper : require('../helper/help')
        })
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router