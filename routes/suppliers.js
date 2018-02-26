"use strict"

const express = require('express');
const suppliers = express.Router();
const model = require('../models')

suppliers.get('/', (request, response) => {
    model.Supplier.findAll({
        include: [
            {model: model.SupplierItem},
            {model: model.Item}
        ],
        order: [['id','ASC']]
    })
    .then(suppliers => response.render('suppliers', {data:suppliers}))
    .catch(err => console.log(err));
});

suppliers.get('/add', (request, response) => {
    response.render('suppliersAdd')
});

suppliers.post('/add', (request, response) => {
    model.Supplier.create({
        name: request.body.name,
        city: request.body.city
    })
    .then(() => response.redirect('/suppliers'))
    .catch(err => response.redirect('/suppliers/add'))
});

suppliers.get('/delete/:id', (request, response) => {
    model.Supplier.destroy({where: {id: request.params.id}})
    .then(() => response.redirect('/suppliers'))
    .catch(err => console.log(err));
});

suppliers.get('/edit/:id', (request, response) => {
    model.Supplier.findById(request.params.id)
    .then(supplier => response.render('suppliersEdit', {data:supplier}))
    .catch(err => console.log(err));
});

suppliers.post('/edit/:id', (request, response) => {
    model.Supplier.update({
        name: request.body.name,
        city: request.body.city
    }, {where:{id: request.params.id}})
    .then(() => response.redirect('/suppliers'))
    .catch(err => console.log(err));
});

suppliers.get('/:id/additem', (request, response) => {
    let supplierData;
    model.Supplier.findAll({
        include: [
            {model: model.Item},
            {model: model.SupplierItem}
        ],
        where: {id: request.params.id}
    })
    .then(supplier => {
        supplierData = supplier;
        return model.Item.findAll();
    })
    .then(items => response.render('supplierAddItem', {supplier:supplierData[0], items:items}))
});

suppliers.post('/:id/additem', (request, response) => {
    model.SupplierItem.create({
        SupplierId: request.params.id,
        ItemId: request.body.ItemId,
        price: request.body.price
    })
    .then(() => response.redirect('/suppliers'))
})

module.exports = suppliers;