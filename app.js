'use strict'

const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.set('views','./views');
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes_home = require('./routes/home');
const routes_suppliers = require('./routes/suppliers');
const routes_items = require('./routes/items');

app.use('/',routes_home);
app.use('/suppliers', routes_suppliers);
app.use('/items', routes_items);

app.listen(3000);