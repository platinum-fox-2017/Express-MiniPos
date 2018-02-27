const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.Item.findAll().then(items => {
    res.render('items', {items})
  })
})

router.get('/add', (req, res) => {
  let err
  models.Item.findAll().then(items => {
    res.render('add_item', {items, err})
  })
})

router.post('/add', (req, res) => {
  models.Item.create({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  }).then(items => {
    res.redirect('/items')
  }).catch(err => {
    res.render('add_item', {err})
  })
})

router.get('/:id/edit', (req, res) => {
  models.Item.findById(req.params.id).then(items => {
    res.render('edit_item', {items})
  })
})

router.post('/:id/edit', (req, res) => {
  models.Item.update({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  },{where: {id: req.params.id}}).then(items => {
    res.redirect('/items')
  }).catch(err => {
    res.render('edit_item', {items, err})
  })
})


router.get('/:id/delete', (req, res) => {
  models.Item.destroy({
    where: {id: req.params.id}
  }).then(items => {
    res.redirect('/items')
  })
})

module.exports = router;
