const express = require('express');
const app = express();
const router = express.Router()

const models = require('../models')

router.get('/',function(req,res){
  models.Supplier.findAll().then(suppliers=>{
    // res.send(suppliers)
    // console.log(JSON.parse(JSON.stringify(suppliers)))
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
module.exports = router



// GET /suppliers/delete/:id (men-delete data suppliers berdasarkan id)