const express = require('express');
const router = express.Router();

const Model = require('../models');
const Items = Model.Items;
const Suppliers = Model.Suppliers;

//READ
router.get('/',(req,res,next) => {
    Items.findAll({
        include: Suppliers,
    })
    .then((data_items) => {
        // res.send(data_items);
        res.render('./items/items', {
            items: data_items
        })
    })
});
//CREATE
router.get('/add',(req,res,next) => {
    res.render('./items/form_add_item', {
        err: null,
    });
});
router.post('/add',(req,res,next) => {
    let new_item = req.body;
    Items.create(new_item)
    .then((data) => res.redirect('/items/'))
    .catch((err) => res.render('./items/form_add_item',{
        err: err.errors[0].message
    }))
});
//UPDATE
router.get('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    Items.findById(search_id)
    .then((item)=> res.render('./items/form_edit_item',{
        item: item,
        err: null,
    }));
});
router.post('/edit/:id',(req,res,next) => {
    
    let edited_item_id = req.params.id;
    // res.send(edited_item_id)
    let edited_item_data = {};
    edited_item_data.name = req.body.name,
    edited_item_data.brand = req.body.brand,
    edited_item_data.codeitem = req.body.codeitem,
    // res.send(edited_item_data)
    Items.update(edited_item_data, {
        where: {
            id: edited_item_id
        }
    })
    .then(()=> res.redirect('/items/'))
    .catch((err) => {
        let search_id = req.params.id;
        Items.findById(search_id)
        .then((item) => {
            res.render('./items/form_edit_item',{
                item: item,
                err: err.errors[0].message,
            })
        })
    })
})
//DELETE
router.get('/delete/:id',(req,res,next) => {
    let item_to_be_deleted = req.params.id
;   Items.destroy({
        where: {
            id: item_to_be_deleted,
        },
        individualHooks: true,
    })
    .then(()=> res.redirect('/items/'));
})

module.exports = router;




// b. Buatlah applikasi CRUD untuk tabel Items pada file items.js
// i. GET /items (menampilkan semua data item)
// ii. GET /items/add (menampilkan form untuk input)
// iii. POST /items/add (menghandle input dari form)
// iv. GET /items/edit/:id (menampilkan form data items berdasarkan id)
// v. POST /items/edit/:id (meng­handle input dari form saat update)
// vi. GET /items/delete/:id (men­delete data items berdasarkan id)