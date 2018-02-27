const express = require('express');

const app = express()

const bodyParser = require('body-parser')

const supplier = require('./routes/supplier')
const item = require('./routes/item')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/suppliers', supplier)
app.use('/items', item)



app.listen(3000, console.log('hahahahahihihi'))
