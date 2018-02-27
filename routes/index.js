const routes = require('express').Router()
const Models = require('../models')

routes.get('/', (req, res)=>{
  // res.status(200).json({ message: 'Connected!'})
  res.render('index.ejs')
})

module.exports = routes;