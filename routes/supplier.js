const express = require('express')
const Router = express.Router()
const Op = require('sequelize').Op
// Model
const Model = require('../models')
const Item = Model.Item
const Supplier = Model.Supplier
const SupplierItem = Model.SupplierItem

// Code
Router.get('/',(req,res)=>{
    Supplier.findAll({
        include: [{model: SupplierItem,include: [Item]}]
    }).then(result=>{
        res.render('supplier/supplier',{
            data: result,
            helper: require('../helper/toLocalString'),
        })
    })
})

Router.get('/add',(req,res)=>{
    res.render('supplier/addSupplier')
})

Router.post('/add',(req,res)=>{
    Supplier.create(req.body).then(result=>{
        res.redirect('/supplier')
    })
})

Router.get('/edit/:id',(req,res)=>{
    let idSupplier = Number(req.params.id)
    Supplier.findById(idSupplier).then(supplierData =>{
        res.render('supplier/editSupplier',{
            data: supplierData
        })
    })
})

Router.post('/edit/:id',(req,res)=>{
    Supplier.update(req.body,{
        where:{id: Number(req.params.id)}
    }).then(result =>{
        res.redirect('/supplier')
    })
})

Router.get('/delete/:id',(req,res)=>{
    let idSupplier = Number(req.params.id)
    Supplier.destroy({
        where:{id: idSupplier},
        individualHooks : true
    }).then(result=>{
        res.redirect('/supplier')
    })
})

Router.get('/addItem/:id',(req,res)=>{
    Supplier.findById(Number(req.params.id),
    {
        include: [
            { model: SupplierItem, include: [Item]}
            ],
    }).then(supplierData=>{
        console.log(JSON.parse(JSON.stringify(supplierData)))
        let tmp = []
        for(let i = 0; i < supplierData.SupplierItems.length;i++){
            tmp.push(supplierData.SupplierItems[i].ItemId)
        }
        Item.findAll({where:{id:{[Op.notIn]: tmp}}
            }).then(itemData =>{
            // console.log(JSON.parse(JSON.stringify(itemData)))
            console.log(tmp)
            res.render('supplier/addItemSupplier',{
                item: itemData,
                supplier: supplierData,
                helper: require('../helper/toLocalString'),
            })
        })
    })
})

Router.post('/addItem/:id',(req,res)=>{
    let obj = {
        SupplierId: Number(req.params.id),
        ItemId: Number(req.body.itemId),
        price: Number(req.body.price)
    }
    
    SupplierItem.create(obj).then(result=>{
        res.redirect(req.get(`referer`))
    })
})

Router.get('/addItem/:id/back',(req,res)=>{
    res.redirect('/supplier')
})



module.exports = Router