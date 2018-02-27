const routes = require('express').Router()
const model = require('../models')


routes.get('/', function(req, res){
    model.Supplier.findAll({
        order: [['id','ASC']],
      })
      .then(suppliers => {
        //   res.send(suppliers)
        res.render('listSupplier',{suppliers:suppliers});
      }).catch(err=>{
        res.send(err)
      });
})


routes.get('/add', function(req, res){
    res.render('formSupplier',{})
})
  
routes.post('/add', function(req, res){
model.Supplier.create({
    name: req.body.supl_name,
    kota: req.body.kota,
    })
    .then(suppliers => {
        res.redirect('/suppliers')
    }).catch(err => {
        res.send(err)
    });
})



routes.get('/edit/:id', function(req, res){
    model.Supplier.findById(req.params.id).then(suppliers => {
        res.render('editSupplier', {suppliers: suppliers})
    })
})

routes.post('/edit/:id', function(req, res){
    let objSupl = {
        name: req.body.supl_name,
        kota: req.body.kota
    }

    model.Supplier.update(objSupl, {
        where: {
            id: req.params.id
        }
    }).then(suppliers => {
        res.redirect('/suppliers')
    }).catch(err => {
        res.send(err)
    })
})


routes.get('/delete/:id', function(req, res){
    model.Supplier.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.redirect('/suppliers')
    }).catch(err => {
        res.send(err)
    })
})


module.exports = routes