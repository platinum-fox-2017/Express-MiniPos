"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/index');
const suppliers = require('./routes/suppliers');
const items = require('./routes/items');
const search = require('./routes/search');

const PORT = 3000;
app.set('view engine', 'ejs');

app.locals.helpers = require('./helpers');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/suppliers', suppliers);
app.use('/items', items);
app.use('/search', search);

app.listen(PORT, () => {
    console.log('PORT 3000 sucessfully runnning')
})