const express = require('express');
const router = express.Router();
const { Item, SupplierItem, Supplier } = require('../models');

router.get('/', (req,res) => {
    Item.findAll()
    .then(data => {
        SupplierItem.findAll({
            include: [Supplier]
        })
        .then(dataConj => {
            let convConj = JSON.parse(JSON.stringify(dataConj))

            res.render('item', { data, convConj, helper: require('../helper/convertMoney') })

        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/add', (req, res) => {
    let err = null
    res.render('item_add', { err })
});

router.post('/add', (req,res) => {
    let addItemObj = {
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem
    }
    Item.create(addItemObj)
    .then(data => {
        res.redirect('/items')
    })
    .catch(err => {
        res.render('item_add', { err: err.errors[0].message})
    })
});

router.get('/edit/:id', (req,res) => {
    Item.findById(req.params.id)
    .then(data => {
        let convertData = JSON.parse(JSON.stringify(data))
        res.render('item_edit', {convertData} );
    })
    .catch(err => {
        console.log(err);
    })
});

router.post('/edit/:id', (req,res) => {
    let editItemrObj = {
        id: req.body.id_edit_item,
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem
    }
    Item.update(editItemrObj,{
        where: {id: req.params.id}
    })
    .then(data => {
       res.redirect('/items')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/delete/:id', (req,res) => {
    Item.destroy({
        where: { id: req.params.id },
        id: req.params.id,
        individualHooks: true
    })
    .then(data => {
        res.redirect('/items');
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router