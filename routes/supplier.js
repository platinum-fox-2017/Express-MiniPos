const express = require('express');
const router = express.Router()
const models = require('../models')

router.get('/', function (req,res) {
  models.Supplier.findAll({
    order: [
      'id'],
    include: [{
      model: models.Item
    }]
    }).then(data => {
    // res.send(data)
    let test = JSON.parse(JSON.stringify(data))
    console.log(data[0].Items[0].SupplierItem.price);
    // res.send(data)
    res.render('supplier', {data_supplier: data})
  })
})

router.get('/add', function (req, res) {
  res.render('add-supplier')
})

router.post('/add', function (req, res) {
  let obj = {
    name: req.body.name,
    kota: req.body.kota
  }
  models.Supplier.create(obj).then(data =>{
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', function (req, res) {
  models.Supplier.findById(req.params.id).then(data => {
    res.render('edit-supplier', {data_supplier: data})
  })
})

router.post('/edit/:id', function (req, res) {
  let obj = {
    name: req.body.name,
    kota: req.body.kota
  }
  models.Supplier.update(obj,{
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/suppliers')
  })
})

router.get('/delete/:id', function (req, res) {
  models.Supplier.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/suppliers')
  })
})

router.get('/:id/additem', function (req, res) {
  // models.SupplierItem.findAll({
  //   attributes: ['id','SupplierId','ItemId','price'],
  //   where: {
  //     SupplierId: req.params.id
  //   },
  //   include: [models.Supplier, models.Item]
  // }).then(data => {
  //   let asd = JSON.parse(JSON.stringify(data))
  //   console.log(asd);
  //   res.render('assign-item', {data: data})
  // })
  models.Subject.findById(req.params.id, {
    include: [{
      model: models.Item
    }]
  }).then(data => {
    console.log(data);
  })
})



module.exports = router
