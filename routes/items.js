'use strict'
const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Item.findAll()
    .then((items) =>{
        res.render('./items/dataItems.ejs', {items: items});
        // res.send(suppliers)
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/add', (req, res) => {
    // res.send('form input add');
    res.render('./items/addItem.ejs', {err: null})
})

router.post('/add', (req,res) => {
    let obj = {
        name: req.body.name,
        brand: req.body.brand,
        codeItem: req.body.codeItem,
    }
    models.Item.create(obj)
    .then((item) => {
        res.redirect('/items')
    })
    .catch((err) => {
        // res.send(err);
        res.render('./items/addItem.ejs', {err: err.message});
    })
})

router.get('/edit/:id', (req, res) => {
    models.Item.findById(req.params.id)
    .then((item) => {
        res.render('./items/editItem.ejs', {item: item})
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/edit/:id', (req,res) => {
    let obj = {
        name: req.body.name,
        brand: req.body.brand,
        codeItem: req.body.codeItem,
    }
    models.Item.update(
        obj,
        {where: {id: req.params.id}}
    )
    .then((items) => {
        res.redirect('/items')
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/delete/:id', (req, res) => {
    models.Item.destroy(
        {where: {id: req.params.id}}
    )
    .then((items) => {
        res.redirect('/items')
    })
    .catch((err) => {
        res.send(err);
    })
    // res.send('form input delete');
})

module.exports = router;