const routes = require('express').Router()
const Models = require('../models')

routes.get('/', (req,res) => {
  Models.Item.findAll({
    include: [{
      model: Models.Supplier
    }]
  })
    .then(items => {
      // res.send(items)
      res.render('items.ejs', {items: items})
    })
    .catch(err => {
      console.log(err)
    })
})

routes.get('/add', (req, res)=>{
  // res.status(200).json({ message: 'Connected!'})
  // console.log(req.query)
  let err = {
    message: req.query.err,
    name: req.query.name,
    brand: req.query.brand,
    codeitem: req.query.codeitem,
  }
  res.render('item-add.ejs', {err: err})
})

routes.post('/add', (req, res)=>{
  let obj = {
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  }
  Models.Item.create(obj)
    .then(()=>{
      res.redirect('/items')
    })
    .catch(err=>{
      res.redirect(`/items/add?err=${err.message}&name=${obj.name}&brand=${obj.brand}&codeitem=${obj.codeitem}`)
    })
})

routes.get('/edit/:id', (req, res) => {
  // res.send('yeeee')
  // console.log(req.query)
  let err = {
    message: req.query.err
  }
  Models.Item.findById(req.params.id)
    .then(item => {
      res.render('item-edit.ejs', {item: item, err: err.message})
    })
    .catch(err => {
      console.log(err)
    })
})

routes.post('/edit/:id', (req, res) => {
  let obj = {
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  }
  // res.send(obj)
  Models.Item.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/items')
  }).catch(err => {
    // console.log(err)
    res.redirect(`/items/edit/${req.params.id}?err=${err.message}&name=${obj.name}&brand=${obj.brand}&codeitem=${obj.codeitem}`)
  })
})

routes.get('/delete/:id', (req, res) => {
  Models.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/items')
  }).catch(err => {
    console.log(err)
  })
})

module.exports = routes;