const routes = require('express').Router();
const models = require('../models')

routes.get('/',(req,res) => {
    models.Item.findAll({
        include : {model:models.Supplier}
    })
    .then((items) => {
        // res.send(items);
        res.render('../views/items/items-table', {items : items})
    })
    .catch((err) => {
        res.send(err)
    })
})

routes.get('/add', (req,res)=> {
    let err = '';
    if(req.query.err != '') {
        err = req.query.err
    }
    res.render('../views/items/items-form',{err : err})
})

routes.post('/add', (req,res) =>{
    models.Item.create(
        {
            name: req.body.item_name,
            brand: req.body.item_brand,
            codeitem: req.body.item_code
        }
    )
    .then(() =>{
        res.redirect('/items')
    })
    .catch((err) => {
        res.redirect(`/items/add?err=${err.message}`);
    })
})

routes.get('/delete/:id',(req,res) => {
    models.Item.findById(req.params.id)
    .then(item => {
        item.destroy()
        .then(() =>{
            res.redirect('/items')
        })
        .catch((err) => {
            res.send(err)
        })
    })
})
module.exports = routes;