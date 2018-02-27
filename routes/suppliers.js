const {Item,Supplier,SupplierItem} = require('../models')
const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
  Supplier.findAll({
    order:[['id','ASC']],
    include:[Item]
  })
  .then(dataSuppliers=>{
    // res.send(dataSuppliers)
    res.render('suppliers.ejs',{dataSuppliers:dataSuppliers})
  })
})

router.post('/add',(req,res)=>{
  Supplier.create({
    name:req.body.name,
    kota:req.body.kota
  }).then((data)=>{
    res.redirect(req.get(`referer`))
  })
})

router.get('/update/:id',(req,res)=>{
  Supplier.findOne({
    where:{
      id:req.params.id
    }
  }).then(dataSuppliers=>{
    // res.send(dataSuppliers)
    res.render('updateSupplier',{dataSuppliers:dataSuppliers})
  })
})

router.post('/update/:id',(req,res)=>{
  let objUpdate = {
    name: req.body.name,
    kota: req.body.kota
  }
  Supplier.update(objUpdate,{
    where:{
      id:req.params.id
    }
  }).then(data=>{
    res.redirect('/suppliers')
  })
})

router.get('/delete/:id',(req,res)=>{
  Supplier.destroy({
    where:{
      id:req.params.id
    }
  }).then(data=>{
    res.redirect('/suppliers')
  })
})

router.get('/assign/:id',(req,res)=>{
  Supplier.findOne({
    where:{
      id:req.params.id,
    },include:Item
  }).then(dataSuppliers=>{
    Item.findAll()
    .then(dataItem=>{
      // res.send(dataItem)
      res.render('assignItem',{dataSuppliers:dataSuppliers,dataItem:dataItem})
    })
  })
})

router.post('/assign/:id',(req,res)=>{
  // res.send(req.body);
  SupplierItem.create({
    SupplierId:req.params.id,
    ItemId:req.body.id_item,
    price:req.body.price
  }).then(()=>{
    res.redirect('/suppliers')
  })
})

module.exports = router;
