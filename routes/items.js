const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models')

router.get('/', (request, response) => {
    models.Item.findAll({
        order: [['id','ASC']]
    }).then(projects => {
        let obj= {
            title: 'List Items',
            arrItems: projects
        }
        // response.send(projects); // return array of objects items
        response.render('show_items.ejs', obj); 
    })
});


router.get('/add', (request, response) => {
    let obj = {
        title: 'Add Items Data'
    };
    response.render('add_item.ejs', {err: null}); // return array of objects supplier
});

router.post('/add', (request,response) => {
    var obj = {
        Name: request.body.Name,
        Brand: request.body.Brand,
        CodeItem: request.body.CodeItem
    }
    models.Item.create(obj)
        .then(() => {
            response.redirect('/items')
        })
        .catch((err) => {
            // response.send(err);
            response.render('add_item.ejs', {err: err.message})
        })
});


router.get('/edit/:id', (request, response) => {
    let obj = {
        title: 'Edit Items Data'
    };
    response.render('edit_item.ejs', obj);
});

router.post('/edit/:id', (request, response) => {
    let obj = request.body;
    let id = request.params.id;
    // response.send(obj);
    models.Item.update(obj, {where: {id: id}})
    .then(() => {
        console.log(obj);
        response.redirect('/items');
    })
    .catch((err) => {
        response.render('items.ejs', {err: err.message})
    })
});

router.get('/delete/:id', (request,response) => {
    let id = request.params.id;
    models.Item.destroy({where: {id: id}})
        .then(() => {  
            console.log(`Successfully deleted ID ${id}`);
        })
    response.redirect('/items');
});



module.exports = router;
