const express = require('express')
const model = require('../models')
const bodyParser = require('body-parser')
const supplier = express.Router()

supplier.use(bodyParser.urlencoded({extended: false}))
supplier.use(bodyParser.json())

supplier.get('/', (req, res) => {
    // res.send(`you're in /suppliers`)
    model.Supplier.findAll({
        order: [['id', 'ASC']],
        include: [{model: model.Item}]
    })
    .then(data => {
        // console.log(data)
        // res.send(data)
        res.render('list-supplier.ejs', {data: data})
    })
})

supplier.get('/add', (req, res) => {
    res.render('add-supplier.ejs')
})

supplier.post('/add', (req, res) => {
    model.Supplier.create({
        Name: req.body.Name,
        City: req.body.City,
        createdAt: new Date (),
        updatedAt: new Date ()
    })
    .then(data => {
        res.redirect('/suppliers')
    })
})

supplier.get('/edit/:id', (req, res) => {
    model.Supplier.findById(req.params.id)
    .then(data => {
        let obj = {
            id: data.id,
            Name: data.Name,
            City: data.City
        }
        res.render('edit-supplier.ejs', {data:obj})
    })
})

supplier.post('/edit/:id', (req, res) => {
    model.Supplier.update({
        Name: req.body.Name,
        City: req.body.City
    },{
        where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/suppliers')
    })
})

supplier.get('/delete/:id', (req, res) => {
    model.Supplier.destroy({
        where: {id: req.params.id}
    })
    .then(data => {
        res.redirect('/suppliers')
    })
})

supplier.get('/:id/additem', (req, res) => {
    model.Item.findAll()
    .then((phone) => {
        model.Supplier.findOne({
            where: {id :req.params.id},
            include: [{model: model.Item}]
        })
        .then(supplier => {
            // res.send(supplier)
            res.render('supplier-additem.ejs', {supplier: supplier, phone: phone})
        })
    })
})

supplier.post('/:id/additem', (req, res) => {
    // phone id
    // supplier id
    // price
    console.log(req.params)
    console.log(req.body)
    model.SupplierItem.create({
        SupplierId: req.params.id,
        ItemId: req.body.ItemId,
        Price: req.body.Price
    })
    res.redirect('/suppliers')
})


module.exports = supplier