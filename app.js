'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: false
}));

const index = require('./routes/index')
const supplier = require('./routes/supplier')
const item = require('./routes/item')
// const subject = require('./routes/subject')

app.use('/', index)
app.use('/supplier', supplier)
app.use('/item', item)
// app.use('/subject', subject)

app.listen(3000, () => {
    console.log('App is now listening on port 3000');
})