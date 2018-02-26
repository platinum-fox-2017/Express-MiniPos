const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes/index.js')
const suppliers = require('./routes/suppliers.js')
const items = require('./routes/items')
 
const app = express()
app.set('view engine', 'ejs');
 
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/suppliers', suppliers)
app.use('/items', items)
app.listen(3000);
console.log('check....');