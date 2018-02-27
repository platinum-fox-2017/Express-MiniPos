'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const index = require('./routes/index')
const suppliers = require('./routes/supplier')
const items = require('./routes/item')
const search = require('./routes/search')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

app.use('/',index)
app.use('/suppliers',suppliers)
app.use('/items',items)
app.use('/search',search)

app.listen(3000, () => console.log('connected!'))