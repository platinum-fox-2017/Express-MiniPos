const routes = require('express').Router()
const Models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

routes.get('/', (req, res)=>{
  Models.Supplier.findAll({
    include: [{
      model: Models.Item
    }]
  })
    .then(suppliers=>{
      res.render('suppliers.ejs', {suppliers: suppliers})
    })
    .catch(err=>{
      console.log(err)
    })
})

routes.get('/add', (req, res)=>{
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
  Models.Supplier.findById(req.params.id)
    .then(supplier => {
      res.render('supplier-edit.ejs', {supplier: supplier})
    })
    .catch(err => {
      console.log(err)
    })
})

routes.post('/edit/:id', (req, res) => {
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

routes.get('/:id/additem', (req, res) => {
  Models.Supplier.findAll({
    include: [{
      model: Models.Item
    }],
    where: {
      id: req.params.id
    }
  }).then(supplier => {
      let arr = []
      supplier[0].Items.forEach(item => {
        arr.push(item.id)
      });
      Models.Item.findAll({
        where: {
          id: {[Op.notIn]: arr}
        }
      })
      .then(items =>{
        res.render('supp-additem.ejs', {supplier: supplier[0], items: items})
      })
      .catch(err => {
        console.log(err)
      })
  }).catch(err => {
    console.log(err)
  })
})

routes.post('/:id/additem', (req, res) => {
  let obj = {
    SupplierId: req.params.id,
    ItemId: req.body.ItemId,
    price: req.body.price
  }
  Models.SupplierItem.create(obj)
  .then(() => {
    res.redirect(`/suppliers/${obj.SupplierId}/additem`)
  }).catch(err => {
    console.log(err)
  })
})
module.exports = routes;