const express = require('express')
const sequelize = require ('sequelize')
const bodyParser = require('body-parser')
const app = express()


app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


let index = require('./routes/index')
let item = require('./routes/items')
let supplier = require('./routes/suppliers')


app.use('/',index)
app.use('/items',item)
app.use('/suppliers',supplier)





app.listen(3000, ()=>{
  console.log('AYE AYE CAPT:3000');
})
