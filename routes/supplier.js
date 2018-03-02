const express = require('express')
const router = express.Router()
const Op = require('sequelize').Op
const Models = require('../models')
const currencyHelper = require('../helper/convertCurrency')



router.get('/', (req, res, next) => {
    Models.Supplier.findAll().then(data => {
        res.render('./supplier-view/supplier', { data });
    })
})

router.post('/add', (req, res, next) => {
    Models.Supplier.create(req.body).then(data => {
        res.redirect('/supplier')
    }).catch(err => {
        console.log(err);
    })
})

router.get('/edit/:id', (req, res) => {
    Models.Supplier.findById(req.params.id).then(data => {
        res.render('./supplier-view/edit-supplier', { data })
    })
})

router.post('/edit/:id', (req, res) => {
    Models.Supplier.update({
        name: req.body.name,
        city: req.body.city,
        updatedAt: new Date()
    }, { where: { id: req.params.id } }).then(data => {
        res.redirect('/supplier')
    })
})

router.get('/delete/:id', (req, res) => {
    Models.Supplier.destroy({ where: { id: req.params.id } }).then(data => {
        res.redirect('/supplier')
    })
})

router.get('/addItem/:id', (req, res) => {
    Models.SupplierItem.findAll({
        include: [Models.Supplier, Models.Item],
        where: {supplierId: req.params.id}
    }).then(conjData => {
        let convertConjData = JSON.parse(JSON.stringify(conjData))
        let temp = []
        for (let i = 0; i < convertConjData.length; i++) {
            temp.push(convertConjData[i].itemId)
        }
        Models.Item.findAll({
            where: {
                id: {
                    [Op.notIn]: temp
                }
            }
        }).then(dataItem => {
            Models.Supplier.findAll({
                where: {id : req.params.id}
            }).then(dataSupplier => {
                let convItem = JSON.parse(JSON.stringify(dataItem))
                let convSupplier = JSON.parse(JSON.stringify(dataSupplier))
                console.log(convertConjData);
                res.render('./supplier-view/assign-item', { dataSupplier: convSupplier, dataConj: convertConjData, dataItem: convItem, currencyHelper: currencyHelper })
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
})

router.post('/addItem/:id', (req, res) => {
    let obj = {
        supplierId: Number(req.params.id),
        itemId: Number(req.body.itemId),
        price: Number(req.body.price)
    }
    Models.SupplierItem.create(obj).then(result => {
        res.redirect(`/supplier/addItem/${req.params.id}`)
    })
})

module.exports = router