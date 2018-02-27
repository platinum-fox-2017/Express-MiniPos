const express = require('express')
const app = express()

var suplierroute=require('./routes/suplierroute')
var itemroute=require('./routes/itemroute')
var search=require('./routes/searchroute')
const bodyparser=require('body-parser')
app.locals.helper=require('./helper/')

app.set('view engine','ejs')

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static('public'))

app.use('/suplier',suplierroute)
app.use('/item',itemroute)
app.use('/search',search)

app.listen(3000,console.log('port 3000 succes'))
