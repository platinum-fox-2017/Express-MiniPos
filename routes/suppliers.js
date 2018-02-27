const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/',(req, res)=> {
    Model.Supplier.findAll({
        include:[Model.Item]
    }).then(data=>{
        // res.send(data)
        res.render('./supplier/listSupplier',{supplier:data})
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/add',(req, res)=> {
   res.render('./supplier/supplierForm', {action:'add', supplier:''})
})
router.post('/add',(req,res)=>{
    Model.Supplier.create({
        name:req.body.name,
        kota:req.body.kota
    }).then(()=>{
        res.redirect('/suppliers')
    }).catch(err=>{
        res.send(err)
        // res.render('./supplier/supplierForm', {action:'add', supplier:'', error:err.errors[0].message})        
    })
})
router.get('/edit/:id',(req,res)=>{
    Model.Supplier.findById(req.params.id).then(data=>{
        res.render('./supplier/supplierForm',{action:'edit', supplier:data})
    }).catch(err=>{
        res.send(err)
    })
})
router.post('/edit/:id',(req,res)=>{
    Model.Supplier.update({
        name:req.body.name,
        kota:req.body.kota
    },{
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/suppliers')
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/delete/:id',(req,res)=>{
    Model.Supplier.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/suppliers')
    }).catch(err=>{
        res.send(err)
    })
})

router.get('/:id/addItem',(req,res)=>{
    Model.Supplier.findById(req.params.id,{
        include:[Model.Item]
    }).then(data=>{
        // res.send(data)
        Model.Item.findAll().then(dataItem=>{
            res.render('./supplier/addItem', {supplier:data, item:dataItem})
        })
    }).catch(err=>{
        res.send(err)
    })
})
router.post('/:id/addItem',(req,res)=>{
    Model.SupplierItem.create({
        SupplierId : req.params.id,
        ItemId:req.body.ItemId,
        price:req.body.price,
    }).then(()=>{
        res.redirect('/suppliers')
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router