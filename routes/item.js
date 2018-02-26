const express = require('express')
const Router = express.Router()
// Model
const Model = require('../models')
const Item = Model.Item
const Supplier = Model.Supplier
const SupplierItem = Model.SupplierItem

// Code
Router.get('/',(req,res)=>{
    Item.findAll({
        include: [{model:SupplierItem,include: [Supplier]}]
    }).then(result=>{
        
        res.render('item/item',{
            data: result,
            helper: require('../helper/toLocalString')
        })
    })
})

Router.get('/add',(req,res)=>{
    res.render('item/addItem',{
        err: null
    })
})

Router.post('/add',(req,res)=>{
    Item.create(req.body).then(result=>{
        res.redirect('/item')

    }).catch((err)=>{
        const error = err.errors.reduce((hasil,value)=>{
            hasil[value.path] = value.message
            return hasil
        },{})
        
        res.render('item/addItem',{
            err:error
        })
    })
})

Router.get('/edit/:id',(req,res)=>{
    let idItem = Number(req.params.id)
    Item.findById(idItem).then(itemData =>{
        res.render('item/editItem',{
            data: itemData,
            err:null
        })
    })
})

Router.post('/edit/:id',(req,res)=>{
    let idItem = Number(req.params.id)
    let obj = {
        id: Number(req.body.id),
        name: req.body.name,
        brand: req.body.brand,
        codeItem: req.body.codeItem
    }
    
    Item.update(obj,{
        where:{id: Number(req.params.id)}
    }).then(result =>{
        res.redirect('/item')
    }).catch((err)=>{
        // console.log(err.errors[0].__raw)
        Item.findById(idItem).then(itemData =>{
            const error =err.errors.reduce((hasil,value)=>{
                if(value.path)
                hasil[value.path] = value.message
                return hasil
            },{})
            res.render(`item/editItem`,{
                err:error,
                data: itemData
            })
        })
    })
})

Router.get('/delete/:id',(req,res)=>{
    let idItem = Number(req.params.id)
    Item.destroy({
        where:{id: idItem}
    }).then(result=>{
        res.redirect('/item')
    })
})

module.exports = Router