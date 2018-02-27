'use strict';
module.exports = (function() {
  const routes = require('express').Router();
  const suppliers = require('./suppliers')
  const items = require('./items')

  routes.use('/items', items)
  routes.use('/suppliers', suppliers)
  routes.get('/', function (req, res) {
    res.render('index',{});
  });
  return routes;
})();
