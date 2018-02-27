'use strict';
const models = require('../models');


module.exports = (function() {
const routes = require('express').Router();

  routes.get('/',function(req,res){
    models.Item.findAll().then(data=>{
      // res.send(data)
      res.render('viewItem',{data:data})
    })
  })

  routes.get('/add',function(req,res){
      res.render('formAddItem',{data:req.query})
  })

  routes.post('/add',function(req,res){
    let obj={
      name:req.body.name,
      brand:req.body.brand,
      codeitem:req.body.codeitem
    }
    models.Item.create(obj).then(data=>{
      res.redirect('/Items')
    }).catch(err=>{
        res.redirect(`/Items/add?error=${err.message}`)
    })

  })

  routes.get('/delete/:id',function(req,res){
    models.Item.destroy({
      where: {
        id: req.params.id
      }
    }).then(data=>{
      res.redirect('/Items')
    }).catch(err=>{
      res.send(err)
    })
  })

  routes.get('/update/:id',function(req,res){
    models.Item.findById(req.params.id).then(data=>{
      res.render('formUpdateItem',{data:data})
    })
  })

  routes.post('/update/:id',function(req,res){
    let obj = {
      name:req.body.name,
      brand:req.body.brand,
      codeitem:req.body.codeitem
    }
    models.Item.update(obj,{
      where:{
        id : req.params.id
      }
    }).then(data=>{
      res.redirect('/Items')
    })
  })


  return routes;
})();
