const express = require('express');
const router = express.Router();
const Op = require('sequelize').Op
const { Supplier, Item, SupplierItem } = require('../models')

router.get('/', (req,res) => {
    Supplier.findAll()
    .then(data => {
        res.render('suppliers', {data})
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/add', (req,res) => {
    res.render('supplier_add')
});

router.post('/add', (req,res) => {
    let addSupplierObj = {
        name: req.body.name,
        kota: req.body.kota
    }
    Supplier.create(addSupplierObj)
    .then(data => {
        res.redirect('/suppliers')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/edit/:id', (req,res) => {
    Supplier.findById(req.params.id)
    .then(data => {
        let convertData = JSON.parse(JSON.stringify(data))
        res.render('supplier_edit', {convertData} );
    })
    .catch(err => {
        console.log(err);
    })
});

router.post('/edit/:id', (req,res) => {
    let editSupplierObj = {
        name: req.body.name,
        kota: req.body.kota
    }
    Supplier.update(editSupplierObj,{
        where: {id: req.params.id}
    })
    .then(data => {
       res.redirect('/suppliers')
    })
    .catch(err => {
        console.log(err)
    })
});

router.get('/:id/addItem', (req,res) => {
    SupplierItem.findAll({
        include: [Supplier, Item],
        where: { SupplierId: req.params.id }
    })
    .then(conjData => {
        let convConjData = JSON.parse(JSON.stringify(conjData))
        let itemTemp = new Array
        for (let i = 0; i < convConjData.length; i++) {
            itemTemp.push(convConjData[i].ItemId)
        }
        Item.findAll({
        where: {
            id: {
                [Op.notIn]: itemTemp
            }
        }
        })
        .then(dataItem => {
            Supplier.findAll({
                where: { id: req.params.id }
            })
                .then(dataSupplier => {
                    let convItem = JSON.parse(JSON.stringify(dataItem))
                    let convSupplier = JSON.parse(JSON.stringify(dataSupplier))
                    console.log(convConjData)
                    res.render('supplier_assign_item', { dataSupplier: convSupplier, dataConj: convConjData, dataItem: convItem })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        }) 
    })   
    .catch(err => {
        console.log(err)
    })
});

router.post('/:id/addItem', (req,res) => {
    let addItemObj = {
        SupplierId: req.params.id,
        ItemId: req.body.itemId,
        price: req.body.price
    }
    SupplierItem.create(addItemObj)
    .then(data => {
        res.redirect(`/suppliers/${req.params.id}/addItem`);
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/delete/:id', (req,res) => {
    Supplier.destroy({
        where: {id: req.params.id}
    })
    .then(data => {
        res.redirect('/suppliers');
    })
    .catch(err => {
        console.log(err)
    })
});


module.exports = router