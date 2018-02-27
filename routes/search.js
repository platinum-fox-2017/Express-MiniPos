"use strict"

const express = require('express');
const model = require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const search = express.Router();

search.get('/', (request, response) => {
    let name = request.query.name
    let max = request.query.max || Number.MAX_SAFE_INTEGER
    let min = request.query.min || 0
    console.log(name, min, max)
    model.SupplierItem.findAll({
        include: [
            {model: model.Item, where:{name:{[Op.iLike]: `%${name}%`}}},
            {model: model.Supplier}
        ],
        where: {
            price: {[Op.between]: [min, max]}
        }
    })
    .then(data => response.render('search/', {data:data}))
});

search.post('/', (request, response) => {
    console.log(request.body)
    response.redirect(`/search?name=${request.body.name}&min=${request.body.minPrice}&max=${request.body.maxPrice}`)
});

module.exports = search;