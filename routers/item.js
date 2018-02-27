const express = require('express')
const router = express.Router()
const {item,supplier} = require('../models')


router.get('/',(req,res)=>{
    item.findAll({include:{model:supplier}}).then(data=>{
        // res.send(data)
        res.render('item',{data:data})
    })
})

router.get('/add',(req,res)=>{
    res.render('addItem',{err:null})
})

router.post('/add',(req,res)=>{
    let obj = {
        name    : req.body.name, 
        brand   : req.body.brand,
        codeitem: req.body.codeitem
    }
    item.create(obj).then(data=>{
        res.redirect('/item')
    }).catch(err=>{
        res.render('addItem',{err:err})
    })
})

router.get('/edit/:id',(req,res)=>{
    let id = req.params.id
    item.findById(id).then(data=>{
        res.render('editItem',{data:data,err:null})
    })
})

router.post('/edit/:id',(req,res)=>{
    let obj ={
        name     : req.body.name,
        brand    : req.body.brand,
        codeitem : req.body.codeitem
    }
    let id = req.params.id
    item.update(obj,{where:{id:id}}).then(data=>{
        res.redirect('/item')
    }).catch(err=>{
        res.render('editItem',{err:err})
    })
})

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    item.destroy({where:{id:id},individualHooks:true}).then(data=>{
        res.redirect('/item')
    })
})
module.exports = router