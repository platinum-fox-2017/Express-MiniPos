const routes = require('express').Router()
const model = require('../models')


routes.get('/', function(req, res){
    model.Item.findAll({
        order: [['id','ASC']],
    }).then(items => {
        // res.send(items)
        res.render('listItem',({items: items}))
    }).catch(err => {
        res.send(err)
    })
})


//Add
routes.get('/add', function(req, res){
    res.render('formItem',{})
})
  
routes.post('/add', function(req, res){
model.Item.create({
    name: req.body.name,
    brand: req.body.brand,
    codeItem: req.body.code_item,
    })
    .then(items => {
        res.redirect('/items')
    }).catch(err => {
        res.send(err)
    });
})


//Update
routes.get('/edit/:id', function(req, res){
    model.Item.findById(req.params.id).then(items => {
        res.render('editItem', {items: items})
    })
})

routes.post('/edit/:id', function(req, res){
    let objSupl = {
        name: req.body.name,
        brand: req.body.brand,
        codeItem: req.body.code_item
    }

    model.Item.update(objSupl, {
        where: {
            id: req.params.id
        }
    }).then(Items => {
        res.redirect('/items')
    }).catch(err => {
        res.send(err)
    })
})


//Delete
routes.get('/delete/:id', function(req, res){
    model.Item.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.redirect('/items')
    }).catch(err => {
        res.send(err)
    })
})




module.exports = routes