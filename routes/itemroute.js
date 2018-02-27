const routeritem = require('express').Router();
const model = require('../models')



routeritem.get('/',(req,res) => {
  model.item.findAll({include:[{model:model.supplier}]}).then(datas =>{
    res.render('item',{data:datas})
    // res.send(datas)
  })
})

routeritem.get('/add',(req,res) => {
  res.render('itemadd',{data:req.query})
})

routeritem.post('/add',(req,res) => {
  model.item.create({name:req.body.nama,brand:req.body.brand,codeitem:req.body.codeitem}).then(()=>{
    res.redirect('/item')
  }).catch(err => {
    res.redirect(`/item/add?err=${err.message}`)
  })
})

routeritem.get('/update/:id',(req,res) => {
  model.item.findById(req.params.id).then(datas =>{
    res.render('itemupdate',{data:datas,error:req.query})
  })
})

routeritem.post('/update/:id',(req,res) => {
  model.item.update({
    name:req.body.nama,
    brand:req.body.brand,
    codeitem:req.body.codeitem},{where:{id:req.params.id}
  }).then(()=>{
    res.redirect('/item')
  }).catch(err => {
    res.redirect(`/item/update/${req.params.id} ?err=${err.message}`)
  })
})

routeritem.get('/delete/:id',(req,res) => {
  model.item.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/item')
  })
})

module.exports = routeritem
