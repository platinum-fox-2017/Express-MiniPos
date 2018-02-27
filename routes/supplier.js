const routes = require('express').Router()
const model = require('../models')
const Op = require('sequelize').Op



routes.get('/', function(req, res){
    model.Supplier.findAll({
        order: [['id','ASC']],
        include: [{
            model: model.Item
        }]
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


routes.get('/:id/additem',function(req, res){
    model.Supplier.findOne({
        where : { 
          id : req.params.id
        },
        include:{
            model: model.Item
        }
    }).then(suppliers => {
        // res.send(suppliers)
        var arrId = []
        suppliers.Items.forEach(supl => {
            arrId.push(supl.id)  
        })
        // res.send(arrId)
        model.Item.findAll({
            where: {
                id: {[Op.notIn]:arrId}
            }
        })
        .then(items => {
            res.render('formAddItem', {suppliers : suppliers, items : items});
            // res.send(items)
        })
    })
    .catch(err => {
        res.send(err);
    });
})

routes.post('/:id/additem',function(req, res){

    model.SupplierItem.create({
        SupplierId: req.params.id,
        ItemId: req.body.itemId,
        price: req.body.price
        
    }).then(suppliers => {
        res.redirect('/suppliers')
    }).catch(err => {
        res.send(err)
    })
})


module.exports = routes