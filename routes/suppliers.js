const routes = require('express').Router()
const Models = require('../models')

routes.get('/', (req, res)=>{
  // res.status(200).json({ message: 'Connected!'})
  Models.Supplier.findAll()
    .then(suppliers=>{
      // res.send(suppliers)
      res.render('suppliers.ejs', {suppliers: suppliers})
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.get('/add', (req, res)=>{
  // res.status(200).json({ message: 'Connected!'})
  res.render('supplier-add.ejs')
})

routes.post('/add', (req, res)=>{
  let obj = {
    name: req.body.name,
    kota: req.body.kota
  }
  Models.Supplier.create(obj)
    .then(()=>{
      res.redirect('/suppliers')
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.get('/edit/:id', (req, res)=>{
  // res.status(200).json({ message: 'Connected!'})
  Models.Supplier.findById(req.params.id)
    .then(supplier => {
      res.render('supplier-edit.ejs', {supplier: supplier})
    })
    .catch(err => {
      console.log(err)
    })
})

routes.post('/edit/:id', (req, res) => {
  // res.send(req.body)
  let obj = {
    name: req.body.name,
    kota: req.body.kota
  }
  Models.Supplier.update(obj, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/suppliers')
  }).catch(err => {
    console.log(err)
  })
})

routes.get('/delete/:id', (req, res) => {
  // res.send('yeeeee')
  Models.Supplier.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/suppliers')
  }).catch(err => {
    console.log(err)
  })
})

module.exports = routes;