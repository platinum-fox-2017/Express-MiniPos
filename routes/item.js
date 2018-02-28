const express = require('express')
const router = express.Router()

const Models = require('../models')


router.get('/', (req, res, next) => {
    Models.Item.findAll().then(data => {
        res.render('./item-view/item', {data, err: req.query.err});
    })
})

router.post('/add', (req, res, next) => {
    Models.Item.create(req.body).then(data => {
        res.redirect('/item')
    }).catch(err => {
        if (!err.errors[0]) {
            err.errors[0].message = null;
        }
        res.redirect(`/item?err=${err.errors[0].message}`);
    })
})

router.get('/edit/:id', (req, res) => {
    Models.Item.findById(req.params.id).then(data => {
        res.render('./item-view/edit-item', { data, err: req.query.err })
    })
})

router.post('/edit/:id', (req, res) => {
    Models.Item.update({
        id: req.body.id,
        name: req.body.name,
        brand: req.body.brand,
        codeitem: req.body.codeitem,
        updatedAt: new Date()
    }, {where: {id:req.params.id}}).then(data => {
        res.redirect('/item')
    }).catch(err => {
        if (!err.errors[0]) {
            err.errors[0].message = null;
        }
        res.redirect(`/item/edit/${req.params.id}?err=${err.errors[0].message}`)
    })
})

router.get('/delete/:id', (req, res) => {
    Models.Item.destroy({where: {id:req.params.id}}).then(data => {
        res.redirect('/item')
    })
})

module.exports = router