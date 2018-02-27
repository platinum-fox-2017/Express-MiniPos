const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const models = require('./models');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const suppliers = require('./routes/suppliers.js');
const items = require('./routes/items.js');
app.use('/suppliers', suppliers);
app.use('/items', items);

app.listen(5000, console.log('Start at port 5000'))
