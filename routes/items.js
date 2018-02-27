"use strict"

const express = require('express');
const items = express.Router();
const model = require('../models');

items.get('/', (request, response) => {
    model.Item.findAll({
        include: [{
            model: model.SupplierItem,
            include: model.Supplier
        }],
        order: [['id']]
    })
    .then(items => response.render('items/items', {data:items}))
});

items.get('/add', (request, response) => {
    response.render('items/itemsAdd', {err: request.query.err});
});

items.post('/add', (request, response) => {
    model.Item.create(request.body)
    .then(() => response.redirect('/items'))
    .catch(err => {console.log(err);response.redirect(`/items/add?err=${err.message}`)})
});

items.get('/edit/:id', (request, response) => {
    model.Item.findById(request.params.id)
    .then(item => response.render('items/itemsEdit', {data: item}))
    .catch(err => console.log(err));
});

items.post('/edit/:id', (request, response) => {
    console.log(request.body)
    model.Item.update(request.body, {where: {id: request.params.id}})
    .then(() => response.redirect('/items'))
    .catch(err => console.log(err));
});

items.get('/delete/:id', (request, response) => {
    model.Item.destroy({where: {id: request.params.id}})
    .then(() => response.redirect('/items'))
    .catch(err => console.log(err));
})

module.exports = items;