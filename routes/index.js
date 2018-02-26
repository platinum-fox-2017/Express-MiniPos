'use strict'

const express = require('express');
const routes = express.Router();

routes.get('/', (request, response) => {
    response.render('index.ejs');
});

module.exports = routes;