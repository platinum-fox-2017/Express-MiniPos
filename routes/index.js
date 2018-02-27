const express = require('express')
const router = express.Router()
const Model = require('../models')
const op = require('sequelize').Op

router.get('/',(req, res)=> {
    res.render('index')
})
router.get('/search',(req, res)=>{
    res.render('search')
})
router.post('/search',(req, res)=>{
    let min = Number(req.body.min_price)
    let max = Number(req.body.max_price)
    let search = req.body.name
    Model.SupplierItem.findAll({
    where:{
        [op.or]:[
            {price:{[op.between]:[min,max]}},
            {price:{[op.gte] : min}},
            {price:{[op.lte] : max}}]
    },
    include:[
        {model:Model.Item, where :{name:{[op.iLike]:`%${search}%`}}},
        {model:Model.Supplier}]
    }).then(data=>{
        res.render('searchResult', {item:data})
    }).catch(err=>{
        res.send(err)
})
})

module.exports = router