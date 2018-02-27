
const routersuplier = require('express').Router();
const model = require('../models')


routersuplier.get('/',(req,res) => {
  model.supplier.findAll({include:[{model:model.item}]}).then(datas =>{
    res.render('suplier',{data:datas})
    // res.send(datas)
  })
})

routersuplier.get('/asignitem/:id',(req,res) => {
  model.supplier.findAll({include:[{model:model.item}],where: {id: req.params.id}}).then(datas =>{

    model.item.findAll().then(dataitems=>{
      res.render('itemsuplier',{data:datas,item:dataitems})
      // res.send({data:datas})
    })
  })
})

routersuplier.post('/asignitem/:id',(req,res) => {
  model.supppplieritem.create({supplier_Id:req.params.id,item_Id:req.body.item,price:req.body.harga}).then(()=>{
    res.redirect('/suplier')
  })
})

routersuplier.get('/add',(req,res) => {
  res.render('suplieradd')
})

routersuplier.post('/add',(req,res) => {
  model.supplier.create({name:req.body.nama,kota:req.body.kota}).then(()=>{
    res.redirect('/suplier')
  })
})

routersuplier.get('/update/:id',(req,res) => {
  model.supplier.findById(req.params.id).then(datas =>{
    res.render('suplierupdate',{data:datas})
  })
})

routersuplier.post('/update/:id',(req,res) => {
  model.supplier.update({name:req.body.nama,kota:req.body.kota},{where:{id:req.params.id}}).then(()=>{
    res.redirect('/suplier')
  })
})

routersuplier.get('/delete/:id',(req,res) => {
  model.supplier.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/suplier')
  })
})

module.exports = routersuplier
