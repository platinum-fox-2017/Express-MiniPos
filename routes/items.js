const {Item,Supplier} = require('../models')
const express = require ('express')
const router = express.Router()

router.get('/',(req,res)=>{
  let err = null
  Item.findAll({
    order:[['id','ASC']],
    include:[Supplier]
  }).then(dataItems=>{
    // res.send(dataItems)
    res.render('items',{dataItems:dataItems,err})
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/add',(req,res)=>{
  res.render('addItem',{err:null})
})

router.post('/add',(req,res)=>{
  Item.create({
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    // res.send(err.errors)
    res.render('addItem',{err:err})
  })
})

router.get('/update/:id',(req,res)=>{
  Item.findOne({
    where:{
      id:req.params.id
    }
  }).then(dataItems=>{
    res.render('updateItem',{dataItems:dataItems,err:null})
  })
})

router.post('/update/:id',(req,res)=>{
  let objUpdate = {
    id:req.body.id,
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  }
  Item.findOne({
    where:{
      id:req.params.id
    }
  }).then(dataItems=>{
    let a = JSON.parse(JSON.stringify(dataItems))
    Item.update(objUpdate,{
      where:{
        id:a.id
      }
    }).then(()=>{
      res.redirect('/items')
    }).catch(err=>{
      console.log(err);
      res.render('updateItem',{dataItems:a,err:err})
    })
  }).catch(err=>{
    res.render('updateItem',{dataItems:a,err:err})
  })
})

router.get('/delete/:id',(req,res)=>{
  Item.destroy({
    where:{
      id:req.params.id
    }
  }).then(()=>{
    res.redirect('/items')
  })
})



module.exports = router;
