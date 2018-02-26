"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/index');
const suppliers = require('./routes/suppliers');
const items = require('./routes/items');

const PORT = 3000;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/suppliers', suppliers);
app.use('/items', items)

app.listen(PORT, () => {
    console.log('PORT 3000 sucessfully runnning')
})