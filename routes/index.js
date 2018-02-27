const express = require('express');
const routes = express.Router();

routes.get('/',function(req,res){
  res.send('Items dan Supplier');
})

routes.use('/items',require('./items.js'));
routes.use('/suppliers',require('./suppliers.js'));

module.exports = routes;
