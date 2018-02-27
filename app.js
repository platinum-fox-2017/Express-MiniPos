const express = require('express')
const app = express()
const model = require('./models')
const port = 3500

const supplierRoute = require('./routes/supplier')
const itemRoute = require('./routes/item')
const searchRoute = require('./routes/search')


app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.locals.helper = require('./helpers/index.js')
app.use('/suppliers', supplierRoute)
app.use('/items', itemRoute)
app.use('/search', searchRoute)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})


