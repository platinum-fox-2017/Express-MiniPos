"use strict"

const express = require('express');
const suppliers = express.Router();
const model = require('../models')

suppliers.get('/', (request, response) => {
    model.Supplier.findAll({
        include: [{
            model: model.SupplierItem,
            include: model.Item
        }],
        order: [['id','ASC']]
    })
    .then(suppliers => response.render('suppliers/suppliers', {data:suppliers}))
    .catch(err => console.log(err));
});

suppliers.get('/add', (request, response) => {
    response.render('suppliers/suppliersAdd')
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
    .then(supplier => response.render('suppliers/suppliersEdit', {data:supplier}))
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
        include: [{
            model: model.SupplierItem,
            include: model.Item
        }],
        where: {id: request.params.id}
    })
    .then(supplier => {
        supplierData = supplier;
        return model.Item.findAll();
    })
    .then(items => response.render('suppliers/supplierAddItem', {supplier:supplierData[0], items:items}))
});

suppliers.post('/:id/additem', (request, response) => {
    console.log(request.body.ItemId, request.params.id, request.body.price)
    model.SupplierItem.create({
        SupplierId: request.params.id,
        ItemId: request.body.ItemId,
        price: request.body.price
    })
    .then(() => response.redirect('/suppliers'))
})

module.exports = suppliers;