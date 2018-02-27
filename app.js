'use strict'

const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const routes = require('./routes');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(1234,()=> {
  console.log('1234 Masuk');
})
