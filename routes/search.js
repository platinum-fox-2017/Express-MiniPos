const express = require('express')
const Router = express.Router()
const Op = require('sequelize').Op;

// Model
const Model = require('../models')
const Item = Model.Item
const Supplier = Model.Supplier
const SupplierItem = Model.SupplierItem

Router.get('/',(req,res)=>{
    SupplierItem.findAll({
        include:[{model:Item},{model: Supplier}]
    }).then((result)=>{
        console.log(JSON.parse(JSON.stringify(result)))
        res.render('search',{
            data: result,
            helper: require('../helper/toLocalString')
        })
    })
})

Router.post('/',(req,res)=>{
    let minPrice = Number(req.body.minPrice)
    let maxPrice = Number (req.body.maxPrice)
    let searchName = req.body.name
    SupplierItem.findAll({
        where:{
            [Op.or]:[
                {price: {[Op.between]: [minPrice, maxPrice],}},
                {price: {[Op.gte]: minPrice}},
                {price: {[Op.lte]: maxPrice}},
            ]
        },
        include:[{model: Item,where:{name:{[Op.iLike]: `%${searchName}%`}} , attributes: ['name']},{model:Supplier,attributes: ['name']}]
    }).then(result=>{
        res.render('search',{
            data:result,
            helper: require('../helper/toLocalString')
        })
    })
})


module.exports = Router