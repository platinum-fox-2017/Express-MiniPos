'use strict'

const express         = require('express')
const app             = express()
const bodyParser      = require('body-parser')
const Item            = require('./routers/item')
const Home            = require('./routers')
const Supplier        = require('./routers/supplier')
const Search          = require('./routers/search')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/',Home)
app.use('/item',Item)
app.use('/supplier',Supplier)
app.use('/search',Search)



app.listen(3000, console.log(`Ready.. Set.. GO!`))
