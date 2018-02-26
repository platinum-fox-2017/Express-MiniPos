const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/',(req, res)=> {
    Model.Item.findAll({
        include:[Model.Supplier]
    }).then(data=>{
        // res.send(data)
        res.render('./item/listItem',{item:data})
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/add',(req, res)=> {
   res.render('./item/itemForm', {action:'add', item:'', error:null})
})
router.post('/add',(req,res)=>{
    Model.Item.create({
        name:req.body.name,
        brand:req.body.brand,
        codeItem:req.body.codeItem,
    }).then(()=>{
        res.redirect('/items')
    }).catch(err=>{
        res.render('./item/itemForm', {action:'add', item:'', error:err.errors[0].message})       
    })
})
router.get('/edit/:id',(req,res)=>{
    Model.Item.findById(req.params.id).then(data=>{
        res.render('./item/itemForm',{action:'edit', item:data, error:null})
    }).catch(err=>{
        res.send(err)
    })
})
router.post('/edit/:id',(req,res)=>{
    Model.Item.update({
        name:req.body.name,
        brand:req.body.brand,
        codeItem:req.body.codeItem,
    },{
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/items')
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/delete/:id',(req,res)=>{
    Model.Item.destroy({
        where:{
            id:req.params.id
        }
    }).then(()=>{
        res.redirect('/items')
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router