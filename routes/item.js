const express = require('express');
const router = express.Router()
const models = require('../models')

router.get('/', function (req, res) {
  models.Item.findAll({
    include: [{
      model: models.Supplier
    }]
  }).then(data => {
    let test = JSON.parse(JSON.stringify(data))
    console.log(test);
    res.render('item', {data_item: data})
  })
})

router.get('/add', function (req, res) {
  let err = ''
  res.render('add-item', { err })
})

router.post('/add', function (req, res) {
  let obj = {
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem,
  }
  // console.log(obj);
  models.Item.create(obj).then(data =>{
    res.redirect('/items')
  }).catch(err => {
    console.log(err);
    res.render('add-item', { err })
  })
})

router.get('/edit/:id', function (req, res) {
  models.Item.findById(req.params.id).then(data => {
    res.render('edit-item', {data_item: data})
  })
})

router.post('/edit/:id', function (req, res) {
  let obj = {
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  }
  models.Item.update(obj,{
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/items')
  })
})

router.get('/delete/:id', function (req, res) {
  models.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.redirect('/items')
  })
})



module.exports = router
