"use strict"
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use('/', routes)

app.listen(3004, ()=>{
  console.log('Start listening on PORT 3004');
})
