const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const RouterSupplier = require('./routers/supplier')
const RouterItem = require('./routers/item')
const RouterSearch = require('./routers/search')


app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/supplier',RouterSupplier)
app.use('/item',RouterItem)
app.use('/search',RouterSearch)


//-------------- Home ---------------------
app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(3000,()=>{
    console.log('server up !')
})