'use strict'
const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Supplier.findAll({
        include: [
            {model: models.SupplierItem},
            {model: models.Item}
        ]
    })
    .then((suppliers) =>{
        res.render('./suppliers/dataSupplier.ejs', {suppliers: suppliers});
        // res.send(suppliers)
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/add', (req, res) => {
    // res.send('form input add');
    res.render('./suppliers/addSupplier.ejs')
})

router.post('/add', (req,res) => {
    let obj = {
        name: req.body.name,
        kota: req.body.kota
    }
    models.Supplier.create(obj)
    .then((supplier) => {
        res.redirect('/suppliers')
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/edit/:id', (req, res) => {
    models.Supplier.findById(req.params.id)
    .then((supplier) => {
        res.render('./suppliers/editSupplier.ejs', {supplier: supplier})
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/edit/:id', (req,res) => {
    let obj = {
        name: req.body.name,
        kota: req.body.kota,
    }
    models.Supplier.update(
        obj,
        {where: {id: req.params.id}}
    )
    .then((supplier) => {
        res.redirect('/suppliers')
    })
    .catch((err) => {
        res.send(err);
    })
})

router.get('/delete/:id', (req, res) => {
    models.Supplier.destroy(
        {where: {id: req.params.id}}
    )
    .then((suppliers) => {
        res.redirect('/suppliers')
    })
    .catch((err) => {
        res.send(err);
    })
    // res.send('form input delete');
})

router.get('/:id/additem', (req, res) => {
    // res.send('On developed')
    // res.send(req.params.id)
    models.Supplier.findAll({
        include: [
            {model: models.SupplierItem},
            {model: models.Item}
        ],
        where: {id: req.params.id}
    })
    .then((dataSupplier) => {
        models.Item.findAll()
        .then((items) =>{
            res.render('./suppliers/addItemSupplier.ejs', {dataSupplier: dataSupplier, items:items})
            // res.send(items)
        })
        .catch((err) => {
            res.send(err);
        })
        // res.send(dataSupplier)
        // console.log(dataSupplier);
    })
    .catch((err) => {
        res.send(err);
    })

})

module.exports = router;