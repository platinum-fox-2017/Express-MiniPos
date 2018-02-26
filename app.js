const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const suppliers = require('./routes/suppliers')
const items = require('./routes/items')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/suppliers', suppliers)
app.use('/items', items)

app.listen(3000, () => console.log('Running'))