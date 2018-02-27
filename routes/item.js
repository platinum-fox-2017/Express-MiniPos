const express = require('express');
const app = express();
const router = express.Router()

const models = require('../models')

router.get('/',function(req,res){
  models.Item.findAll({
    order:[['name','asc']],
    include:[models.Supplier]})
    .then(items=>{
    // console.log(JSON.parse(JSON.stringify(items)))
    res.send(items)
    res.render('item/items',{data:items})
  }).catch(err=>{
    res.send(err)
  })
})
router.get('/add',function(req,res){
  res.render('item/form_item',{error:null})
})
router.post('/add',function(req,res){
  models.Item.create(req.body).then(data=>{
    res.redirect('/items')
  }).catch(err=>{
    res.render('item/form_item',{error:err.errors[0].message})
  })
})

router.get('/edit/:id',function(req,res){
  let id = req.params.id
  models.Item.findOne({where:{id:id}}).then(data=>{
    // console.log(JSON.parse(JSON.stringify(data)))
    res.render('item/edit_item',{dataItem:data})
  }).catch(err=>{
    res.send(err)
  })
})
router.post('/edit/:id',function(req,res){
  let id = req.params.id
  models.Item.update(req.body,{where:{id:id}}).then(data=>{
    // console.log(JSON.parse(JSON.stringify(data)))
    res.redirect('/items')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id',function(req,res){
  let id = req.params.id
  models.Item.destroy({where:{id:id}}).then(()=>{
    res.redirect('/items')
  })
})


module.exports = router
