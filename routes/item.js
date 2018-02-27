const express = require('express')
const model = require('../models')
const bodyParser = require('body-parser')
const item = express.Router()

item.use(bodyParser.urlencoded({extended: false}))
item.use(bodyParser.json())

item.get('/', (req, res) => {
    // res.send('hello')
    model.Item.findAll({
        order: [['id', 'ASC']],
        include: [{model: model.Supplier}]
    })
    .then(data => {
        // res.send(data)
        res.render('list-item.ejs', {data: data})
    })
})

item.get('/add', (req, res) => {
    // res.send('in add')
    res.render('add-item.ejs', {err: req.query})
})
item.post('/add', (req, res) => {
    model.Item.create({
        Name: req.body.Name,
        Brand: req.body.Brand,
        CodeItem: req.body.CodeItem,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(data => {
        console.log(data)
        res.redirect('/items')
    })
    .catch(error => {
        res.redirect(`/items/add?err=${error.message}`)
    })
})

item.get('/edit/:id', (req, res) => {
    console.log(req.query)
    model.Item.findById(req.params.id)
    .then(data => {
        let obj = {
            id: data.id,
            Name: data.Name,
            Brand: data.Brand,
            CodeItem: data.CodeItem,
        }
        res.render('edit-item.ejs', {data:obj, err: req.query})
    })
    // res.render('edit-item.ejs')
})
item.post('/edit/:id', (req, res) => {
    model.Item.update({
        Name: req.body.Name,
        Brand: req.body.Brand,
        CodeItem: req.body.CodeItem
    },{
        where: {id: req.params.id}
    })
    .then(() => {
        console.log(req.body.CodeItem)
        res.redirect('/items')
    })
    .catch((error) =>{
        // res.send(error)
        res.redirect(`/items/edit/${req.params.id}?err=${error.message}`)
    })
})

item.get('/delete/:id', (req, res) => {
    console.log(req.params.id)
    model.Item.destroy({
        where: {id: req.params.id}
    })
    .then(data => {
        console.log(data)
        res.redirect('/items')
    })
})



module.exports = item