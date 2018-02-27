const express = require('express');
const router = express.Router();

const Model = require('../models');
const Suppliers = Model.Suppliers;
const Items = Model.Items;
const SupplierItems= Model.SupplierItems;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Help = require('../helpers/help');

//READ
router.get('/',(req,res,next) => {
    Suppliers.findAll({
        include: Items,
    })
    .then((data_suppliers) => {
        // res.send(data_suppliers);
        res.render('./suppliers/suppliers', {
            suppliers: data_suppliers,
            formatuang: Help.formatuang,
        })
    })
});
//CREATE
router.get('/add',(req,res,next) => {
    res.render('./suppliers/form_add_supplier');
});
router.post('/add',(req,res,next) => {
    let new_supplier = req.body;
    Suppliers.create(new_supplier)
    .then((data)=> res.redirect('/suppliers/'));
});
//UPDATE
router.get('/edit/:id',(req,res,next) => {
    let search_id = req.params.id;
    Suppliers.findById(search_id)
    .then((supplier)=> res.render('./suppliers/form_edit_supplier',{
        supplier: supplier,
    }));
});
router.post('/edit/:id',(req,res,next) => {
    let edited_supplier_id = +req.params.id;
    // res.send(edited_supplier_id)
    let edited_supplier_data = {};
    edited_supplier_data.name = req.body.name,
    edited_supplier_data.kota = req.body.kota,
    // res.send(edited_supplier_data)
    Suppliers.update(edited_supplier_data, {
        where: {
            id: edited_supplier_id
        }
    })
    .then(()=> res.redirect('/suppliers/'));
});
//DELETE
router.get('/delete/:id',(req,res,next) => {
    let supplier_to_be_deleted = req.params.id
;   Suppliers.destroy({
        where: {
            id: supplier_to_be_deleted,
        }
    })
    .then(()=> res.redirect('/suppliers/'));
})
//ASSIGN ITEM
router.get('/:id/additem',(req,res,next) => {
    let search_id = req.params.id
    Suppliers.findById(search_id,{
        include: Items,
    })
    .then((supplier) => {
        let id_of_known_items = supplier.Items.map((v,i,a) => {
            return v.id;
        })
        // console.log(id_of_known_items);
        Items.findAll({
            where: {
                id : {
                    [Op.notIn]: id_of_known_items,
                }
            }
        })
        .then((items_only) => {
            // console.log(id_of_known_items)
            // res.send(supplier);
            // res.send(items_only);
            res.render('./supplieritems/assign_item',{
                supplier: supplier,
                items_only: items_only,
            })
        })
    })
})
router.post('/:id/additem',(req,res,next) => {
    let supplier_id = req.params.id; 
    let item_id = req.body.ItemId; 
    let price = req.body.price; 
    // console.log(supplier_id);
    // console.log(item_id);
    // console.log(price);
    let new_supplier_item ={}
    new_supplier_item.SupplierId = supplier_id;
    new_supplier_item.ItemId = item_id;
    new_supplier_item.price = price;
    SupplierItems.create(new_supplier_item)
    .then(() => res.redirect('/suppliers/'));

})

module.exports = router;

// 9. Tambahkan tombol ‘Assign Item’ yang akan mengarah kehalaman assignItem untuk
// mendaftarkan barang yang dijual oleh Supplier dan menginput harga.
// a. GET /suppliers/:id/additem
// i. Tampilkan list item dalam bentuk select option (5)
// ii. List item yang di tampilkan pada select option hanya item yang belum
// didaftarkan untuk supplier tersebut (5)
// b. POST /suppliers/:id/additem (save/update SupplierItem) (5)