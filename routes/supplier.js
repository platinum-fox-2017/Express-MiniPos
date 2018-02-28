const express = require('express')
const router = express.Router()

const Models = require('../models')


router.get('/', (req, res, next) => {
    Models.Supplier.findAll().then(data => {
        res.render('./supplier-view/supplier', { data });
    })
})

router.post('/add', (req, res, next) => {
    Models.Supplier.create(req.body).then(data => {
        res.redirect('/supplier')
    }).catch(err => {
        console.log(err);
    })
})

router.get('/edit/:id', (req, res) => {
    Models.Supplier.findById(req.params.id).then(data => {
        res.render('./supplier-view/edit-supplier', { data })
    })
})

router.post('/edit/:id', (req, res) => {
    Models.Supplier.update({
        name: req.body.name,
        city: req.body.city,
        updatedAt: new Date()
    }, { where: { id: req.params.id } }).then(data => {
        res.redirect('/supplier')
    })
})

router.get('/delete/:id', (req, res) => {
    Models.Supplier.destroy({ where: { id: req.params.id } }).then(data => {
        res.redirect('/supplier')
    })
})

module.exports = router