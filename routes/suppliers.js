const express = require('express');
const routes = express.Router();
const models = require('../models');
const sequelize = require('sequelize');

routes.get('/',function(req,res){
  models.Supplier.findAll({include:[{model:models.Item}]})
    .then((dataSuppliers)=>{
      let obj = {
        title: 'Items',
        suppliers: dataSuppliers
      }
      res.render('suppliers/suppliers.ejs',obj);
      // res.send(dataSuppliers);
    })
})

routes.get('/add',function(req,res){
  res.render('suppliers/add.ejs')
})

routes.post('/add',function(req,res){
  models.Supplier.create({
    name: req.body.newName,
    kota: req.body.newKota,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(function(){
    res.redirect('/suppliers');
  })
})

routes.get('/edit/:id',function(req,res){
  models.Supplier.findById(req.params.id).then(dataSuppliers => {
    let obj = {
      id: dataSuppliers.id,
      nama: dataSuppliers.name,
      city: dataSuppliers.kota
    }
    res.render('suppliers/edit.ejs',obj)
  })
})

routes.post('/edit/:id',function(req,res){
  models.Supplier.update({
    name: req.body.newName,
    kota: req.body.newKota,
    updatedAt: new Date()
  },{where:{id:req.body.id}
  }).then(function(){
    res.redirect('/suppliers');
  })
})

routes.get('/delete/:id',function(req,res){
  models.Supplier.destroy({
    where:{
      id:req.params.id
    }
  }).then(function(){
    res.redirect('/suppliers');
  })
})

routes.get('/additem/:id',function(req,res){
  models.Supplier.findAll({include:[{model:models.Item}],
    where:{id:req.params.id}})
    .then(dataSuppliers => {
      models.Item.findAll({}).then(dataItems => {
        let obj = {
          id: dataSuppliers.id,
          suppliers: dataSuppliers,
          items: dataItems
        }
        res.render('suppliers/additem.ejs',obj)
    })
  })
})

routes.post('/additem/:id',function(req,res){
  models.SupplierItem.create({
    SupplierId: req.body.supplierId,
    ItemId: req.body.getItemId,
    price: req.body.newPrice,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(function(){
    res.redirect('/suppliers');
  })
})



module.exports = routes;
