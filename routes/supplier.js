const express = require('express');
const app = express();
const router = express.Router()

const models = require('../models')

router.get('/',function(req,res){
  models.Supplier.findAll({
  include:[models.Item]}).then(suppliers=>{
    // res.send(suppliers[0])
    // console.log(JSON.parse(JSON.stringify(suppliers[0].Items)))
    res.render('supplier/suppliers',{data:suppliers})
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/add',function(req,res){
  res.render('supplier/form_supplier')
})

router.post('/add',function(req,res){
  // console.log(req.body)
  models.Supplier.create(req.body).then(data=>{
    res.redirect('/suppliers')
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/edit/:id',function(req,res){
  let id = req.params.id
  // console.log(id)
  models.Supplier.findById(id).then(data=>{
    // console.log(data)
    res.render('supplier/edit_supplier',{dataSupplier:data})
  }).catch(err=>{
    res.send(err)
  })
})
router.post('/edit/:id',function(req,res){
  // console.log(req.body)
  let id = req.params.id
  models.Supplier.update(req.body,{where:{id:id}}).then(()=>{
    res.redirect('/suppliers')
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/delete/:id',function(req,res){
  let id =req.params.id
  models.Supplier.destroy({where:{id:id}}).then(()=>{
    res.redirect('/suppliers')
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/:id/additem',function(req,res){
  let id = req.params.id
  models.Supplier.findById(id).then(supplier=>{
    models.Item.findAll().then(items=>{
      res.render('supplier/form_addItem',{dataSupplier:supplier,dataItem:items})
    }).catch(errIt=>{
      res.send(errIt)
    })
  }).catch(errSup=>{
    res.send(errSup)
  })
})
router.post('/:id/additem',function(req,res){
  let id = req.params.id
  let obj = {
    ItemId : req.body.ItemId,
    SupplierId : id
  }
  models.SupplierItem.create(obj,{where:{id:id}}).then(()=>{
    res.redirect('/suppliers')
  }).catch(err=>{
    res.send(err)
  })
})




module.exports = router
