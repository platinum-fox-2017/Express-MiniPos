const express = require('express');
const router = express.Router();
const { Item, SupplierItem, Supplier, Sequelize } = require('../models');
const Op = Sequelize.Op

router.get('/', (req,res) => {
    let dataSearch = 0
    res.render('search', { dataSearch })
})

router.post('/item', (req,res) => {
    let minNum
    let maxNum = 0
    console.log(req.body.max_price.length)
    if(req.body.min_price.length > 0 || req.body.min_price !== null){
        minNum = Number(req.body.min_price);
    } else {
        minNum = 0
    }

    if(req.body.max_price.length > 0) {
        maxNum = Number(req.body.max_price)
    }

    SupplierItem.findAll({
        where: {  
            [Op.or]: [
                { price: { [Op.between]: [minNum, maxNum] } }
            ]
        },
        include: [Supplier, { 
            model: Item, where: { 
                name: { 
                    [Op.iLike]: `%${req.body.item}%` 
                } 
            } 
        }]
    })
    .then(data => {
        console.log(req.body.item)
        let convData = JSON.parse(JSON.stringify(data))
        // console.log(convData)
        res.render('search', { dataSearch: convData })
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router