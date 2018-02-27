const express = require('express')
const app = express()
const PORT = 3000

const bodyParser = require('body-parser')

const index = require('./routes/index.js')
const suppliers = require('./routes/suppliers.js')
const items = require('./routes/items.js')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/suppliers', suppliers)
app.use('/items', items)

// Testing
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!'})
// })

// Server
app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`)
})