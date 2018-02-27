'use strict';
const models = require('../models');

module.exports = (function() {
  const routes = require('express').Router();

  routes.get('/',function(req,res){
    models.Supplier.findAll({
      order: ['id'],
      include: [{
        model: models.Item
      }]
    }).then(data=>{
      // console.log(data);
      // data[0].getSupplierItems().then(data_supplier=>{
      //   console.log(data_supplier)
      // })
        // let data = JSON.parse(JSON.stringify(subjects))
         // res.send(subjects)
      res.render('viewSupplier',{data:data})
      // res.send(data)
    })
  })

  routes.get('/add',function(req,res){
      res.render('formAddSupplier',{})
  })

  routes.post('/add',function(req,res){
    let obj={
      name:req.body.name,
      kota:req.body.kota
    }
    models.Supplier.create(obj).then(data=>{
      res.redirect('/suppliers')
    }).catch(err=>{
      res.send(err)
    })

  })

  routes.get('/addSupplierItem/:id',function(req,res){
      models.Supplier.findById(req.params.id).then(data=>{
        models.Item.findAll().then(data_item=>{
            res.render('formAddSupplierItem',{data: data, data_item:data_item})
        })
      })

  })

  routes.post('/addSupplierItem/:id',function(req,res){
    let obj={
      SupplierId : req.params.id,
      ItemId : req.body.ItemId,
      price : req.body.price
    }
      models.SupplierItem.create(obj).then(data => {
          res.redirect('/suppliers')
      }).catch(err=>{
          res.send(err)
      });

  })

  routes.get('/delete/:id',function(req,res){
    models.Supplier.destroy({
      where: {
        id: req.params.id
      }
    }).then(data=>{
      res.redirect('/suppliers')
    }).catch(err=>{
      res.send(err)
    })
  })

  routes.get('/update/:id',function(req,res){
    models.Supplier.findById(req.params.id).then(data=>{
      res.render('formUpdateSupplier',{data:data})
    })
  })

  routes.post('/update/:id',function(req,res){
    let obj = {
      name : req.body.name,
      kota : req.body.kota
    }
    models.Supplier.update(obj,{
      where:{
        id : req.params.id
      }
    }).then(data=>{
      res.redirect('/suppliers')
    })
  })

  return routes;
})();
