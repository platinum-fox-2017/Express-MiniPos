const express = require('express')
const router = express.Router()
const Model = require('../models')
const Op = require('sequelize').Op

router.get('/',(req, res)=> {
    res.render('index')
})
router.get('/search',(req, res)=>{
    res.render('search')
})
router.post('/search',(req, res)=>{
    Model.SupplierItem.findAll({
        include:[{
            model:Model.Item,where:{
                name:{
                    [Op.iLike]: `%${req.body.name}%`
                } 
            }
        }, Model.Supplier],
        where:{
            price:{
                [Op.between]: [req.body.min_price, req.body.max_price]
            }
        }
    }).then(data=>{
        res.render('searchResult', {item:data})
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router