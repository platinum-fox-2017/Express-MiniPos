const express = require('express');
const routes = express.Router();
const models = require('../models');
const sequelize = require('sequelize');

routes.get('/',function(req,res){
  models.Item.findAll({include:[{model:models.Supplier}]})
    .then((dataItems)=>{
      let obj = {
        title: 'Items',
        items: dataItems
      }
      res.render('items/items.ejs',obj);
    })
})

routes.get('/add',function(req,res){
  let errorMessage;
  if(req.query===null){
    errorMessage = null
  } else {
    errorMessage = req.query.err
  }
  res.render('items/add.ejs',{err:errorMessage});
})

routes.post('/add',function(req,res){
  models.Item.create({
    name: req.body.newName,
    brand: req.body.newMerek,
    codeItem: req.body.newKode,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(function(){
    res.redirect('/items');
  }).catch((err)=>{
    res.redirect(`/items/add?err=${err.message}`);
  })
})

routes.get('/edit/:id',function(req,res){
  models.Item.findById(req.param('id')).then(dataItems => {
    let obj = {
      id: dataItems.id,
      nama: dataItems.name,
      merek: dataItems.brand,
      kode: dataItems.codeItem
    }
    let errorMessage;
    if(req.query===null){
      errorMessage = null
    } else {
      errorMessage = req.query.err
    }
    res.render('items/edit.ejs',{data:obj,err:errorMessage});
  })
})

routes.post('/edit/:id',function(req,res){
  models.Item.update({
    name: req.body.newName,
    brand: req.body.newMerek,
    codeItem: req.body.newKode,
    updatedAt: new Date()
  },{where:{id:req.body.id}
  }).then(function(){
    res.redirect('/items');
  }).catch(function(){
    res.redirect(`/items/edit/${req.params.id}?err=${err.message}`);
  })
})

routes.get('/delete/:id',function(req,res){
  models.Item.destroy({
    where:{
      id:req.params.id
    }
  }).then(function(){
    res.redirect('/items');
  })
})



module.exports = routes;
