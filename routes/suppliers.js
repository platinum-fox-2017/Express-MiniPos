'use strict'
const router = require('express').Router();
const models = require('../models');
const Op = require('sequelize').Op;

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
        include: [{
        model: models.Item
        }],
        where: {
        id: req.params.id
        }
    }).then(dataSupplier => {
        let arr = []
        dataSupplier[0].Items.forEach(item => {
            arr.push(item.id)
        });
        models.Item.findAll({
            where: {
            id: {[Op.notIn]: arr}
            }
        })
        .then(items =>{
            // res.send(dataSupplier[0])
            res.render('./suppliers/addItemSupplier.ejs', {dataSupplier: dataSupplier[0], items: items})
        })
        .catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/:id/additem', (req, res) => {
  // res.send(req.body)
  // console.log(req.params.id)
  let obj = {
    SupplierId: req.params.id,
    ItemId: req.body.ItemId,
    price: req.body.price
  }
  // res.send(obj)
  models.SupplierItem.create(obj)
  .then(() => {
    res.redirect(`/suppliers/${obj.SupplierId}/additem`)
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router;