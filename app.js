const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// EJS
app.set('view engine', 'ejs')

// Body Parser
app.use(bodyParser.urlencoded({extended:false}))

// Routes
const index = require('./routes/index')
const supplier = require('./routes/supplier')
const item = require('./routes/item')
const search = require('./routes/search')

// Use
app.use('/', index)
app.use('/supplier' ,supplier)
app.use('/item', item)
app.use('/search',search)

app.listen(3000,()=>{
    console.log(`Welcome Aboard`)
})