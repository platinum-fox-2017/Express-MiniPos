const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Model = require('../models');
const Items = Model.Items;
const Suppliers = Model.Suppliers;
const SupplierItems = Model.SupplierItems;



router.get('/',(req,res,next)=> {
    // res.send('Search In');
    res.render('./search/search');

})
router.post('/result',(req,res,next) => {

    let minimum_value = Number(req.body.min);
    let maximum_value = Number(req.body.max);
    let search_name = req.body.name;

    SupplierItems.findAll({
        include: [{model:Items,where:{[Op.or]:[
            {name:{[Op.iLike]: `%${search_name}%`,}},
            {brand:{[Op.iLike]: `%${search_name}%`,}},
        ]},attributes:['name','brand']},{model:Suppliers,attributes:['name']}],
        where: { 
            [Op.or]: [
                {price: {[Op.between]: [minimum_value, maximum_value], }},
                {price: {[Op.gte]: minimum_value,}},
                {price: {[Op.lte]: maximum_value,}},
            ],  
        },  
    })
    .then((data)=> {
        // console.log(JSON.stringify(data))
        // res.send(data);
        res.render('./search/search',{
            data:data,
        })
        
    })

})

module.exports = router;