const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.Supplier.findAll({
    order: ['name'],
    include: [models.Item]
  }).then(suppliers => {
    res.render('suppliers', {suppliers})
  })
})

router.get('/add', (req, res) => {
  models.Supplier.findAll().then(suppliers => {
    res.render('add_supplier', {suppliers})
  }).catch(err => {
    res.render('add_supplier', {suppliers, err})
  })
})

router.post('/add', (req, res) => {
  models.Supplier.create({
    name: req.body.name,
    city: req.body.city
  }).then(suppliers => {
    res.redirect('/suppliers')
  }).catch(err => {
    res.render('add_supplier', {suppliers, err})
  })
})

router.get('/:id/edit', (req, res) => {
  models.Supplier.findById(req.params.id).then(suppliers => {
    res.render('edit_supplier', {suppliers})
  })
})

router.post('/:id/edit', (req, res) => {
  models.Supplier.update({
    name: req.body.name,
    city: req.body.city
  },{where: {id: req.params.id}}).then(suppliers => {
    res.redirect('/suppliers')
  }).catch(err => {
    res.render('edit_supplier', {suppliers, err})
  })
})


router.get('/:id/delete', (req, res) => {
  models.Supplier.destroy({
    where: {id: req.params.id}
  }).then(suppliers => {
    res.redirect('/suppliers')
  })
})

router.get('/:id/assignitem', (req, res) => {
  models.SupplierItem.findAll({
    attributes: ['id', 'SupplierId', 'ItemId'],
    include: [models.Item, models.Supplier],
    where: {SupplierId: req.params.id}
  }).then(data => {
    models.Item.findAll().then(items => {
      res.render('assignitem', {data, items})
    })
  })
})

module.exports = router;
