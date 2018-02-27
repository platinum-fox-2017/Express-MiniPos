const routes = require('express').Router()
const model = require('../models')



routes.get('/', function(req, res){
    res.render('home')
})

routes.get('/home', function(req, res){
    res.render('home')
})


module.exports = routes