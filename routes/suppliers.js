const routes    = require('express').Router();
const models    = require('../models');
const Sequelize = require('sequelize');
const Op        = Sequelize.Op;

routes.get('/', (req, res) => {
    models.Supplier.findAll({
        order:[['id','ASC']],
        include : {model : models.Item}
    })
    .then(suppliers => {
        // res.send(suppliers);
        res.render('../views/suppliers/suppliers-table', { suppliers: suppliers })
    })
})

routes.get('/add', (req, res) => {
    res.render('../views/suppliers/suppliers-form')
})

routes.post('/add', (req, res) => {
    models.Supplier.create({
        name: req.body.supplier_name,
        kota: req.body.supplier_kota
    })
        .then(() => {
            res.redirect('/suppliers');
        })
        .catch((err) => {
            res.send(err);
        })
})

routes.get('/edit/:id', (req, res) => {
    models.Supplier.findOne({
        where: { id: req.params.id }
    })
        .then(supplier => {
            res.render('../views/suppliers/suppliers-edit-form', { supplier: supplier })
        })
        .catch((err) => {
            res.send(err);
        })
})

routes.post('/edit/:id', (req, res) => {
    models.Supplier.update(
        {
            name: req.body.supplier_name,
            kota: req.body.supplier_kota
        },
        {where : { id: req.params.id }}
    )
        .then(() => {
            res.redirect('/suppliers')
        })
        .catch((err) => {
            res.send(err)
        })
})

routes.get('/delete/:id',(req,res) => {
    models.Supplier.findById(req.params.id)
    .then(supplier => {
        supplier.destroy()
        .then(() =>{
            res.redirect('/suppliers')
        })
        .catch((err) => {
            res.send(err)
        })
    })

})

routes.get('/:id/additem',(req,res) => {
    models.Supplier.findOne({
        where : { id : req.params.id},
        include: [{model : models.Item},{model : models.SupplierItem}],
    })
    .then(supplier => {
        if(supplier.Items.length > 0) {
            let arrId = [];

            for(let i = 0; i < supplier.Items.length; i++) {
                arrId.push(supplier.Items[i].id)
            }

            models.Item.findAll({
                where : { id : {[Op.notIn] : arrId}}
            })
            .then(items => {
                res.render('../views/suppliers/suppliers-add-item',{supplier:supplier,items:items});
            })
        } else {
            models.Item.findAll()
            .then(items => {
                res.render('../views/suppliers/suppliers-add-item',{supplier:supplier,items:items});
            })
        }
    })
})

routes.post('/:id/additem',(req,res) => {
    models.SupplierItem.create({
        SupplierId : req.params.id,
        ItemId     : req.body.assign_item,
        price: req.body.price
    })
    .then(() => {
        res.redirect(`/suppliers/${req.params.id}/additem`);
    })
})


module.exports = routes;