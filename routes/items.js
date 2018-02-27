const routes = require('express').Router()
const Models = require('../models')

routes.get('/', (req,res) => {
  Models.Item.findAll()
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
  res.render('item-add.ejs')
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
      console.log(err)
    })
})

routes.get('/edit/:id', (req, res) => {
  // res.send('yeeee')
  Models.Item.findById(req.params.id)
    .then(item => {
      res.render('item-edit.ejs', {item: item})
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
    console.log(err)
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