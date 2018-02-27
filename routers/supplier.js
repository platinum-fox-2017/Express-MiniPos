const express = require('express')
const router = express.Router()
const {supplier,item,supplierItem} = require('../models')


router.get('/',(req,res)=>{
    supplier.findAll({include:item}).then(data=>{
        // res.send(data)
        res.render('supplier',{data:data,helper:require('../helper/help')})
    })
})

router.get('/add',(req,res)=>{
    res.render('addSupplier')
})

router.post('/add',(req,res)=>{
    let obj = {
        name : req.body.name, 
        city : req.body.city
    }
    supplier.create(obj).then(data=>{
        res.redirect('/supplier')
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/edit/:id',(req,res)=>{
    let id = req.params.id
    supplier.findById(id).then(data=>{
        res.render('editSupplier',{data:data})
    })
})

router.post('/edit/:id',(req,res)=>{
    let obj ={
        name : req.body.name,
        city : req.body.city
    }
    let id = req.params.id
    supplier.update(obj,{where:{id:id}}).then(data=>{
        res.redirect('/supplier')
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    supplier.destroy({where:{id:id}}).then(data=>{
        res.redirect('/supplier')
    })
})

router.get('/:id/additem',(req,res)=>{
    let id = req.params.id
    supplier.findById(id,{include:item}).then(data=>{
        item.findAll().then(data2=>{
            res.render('additem_supplier',{supplier:data,item:data2,helper:require('../helper/help')})
        }).catch(err=>{
            res.send(err)
        })
    })
})

router.post('/:id/additem',(req,res)=>{
    let obj = {
        supplierId  : req.params.id,
        itemId      : req.body.itemId,
        price       : req.body.price
    }
    supplierItem.create(obj,{individualHooks:true}).then(data=>{
        res.redirect('/supplier')
    })
})



module.exports = router