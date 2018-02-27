'use strict'

const express = require('express')
const indexRoutes = require('./routes')
const supplier = require('./routes/supplier')
const item = require('./routes/item')
const model = require('./models');

const bodyParser = require('body-parser')

const app = express()
const port = 3000


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');



app.use('/', indexRoutes)
app.use('/suppliers', supplier)
app.use('/items', item)


app.listen(port, log =>{
  console.log(`App is running on port: ${port}`)
})



