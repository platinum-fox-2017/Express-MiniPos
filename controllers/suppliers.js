const { Supplier, SupplierItem, Item } = require('../models')
const money = require('../helpers/price-format')

const ShowAllSuppliers = (req, res) => {
    Supplier.findAll({
        include: [Item]
    }).then((datas) => {
        // res.send(datas)
        res.render('suppliers/suppliers', { datas, currency: money })
    }).catch((err) => { console.log(err) })
}

const SupplierForm = (req, res) => {
    let data = {
        name: '',
        city: '',
    }
    res.render('suppliers/suppliers-form', { data, action: '/suppliers/add' })
}

const addSupplier = (req, res) => {
    // console.log(req.body)
    Supplier.create(req.body).then(() => {
        res.redirect('/suppliers')
    }).catch((err) => { console.log(err) })
}

const editSupplier = (req, res) => {
    const id = req.params.id
    console.log(req)
    Supplier.findById(id).then((data) => {
        res.render('suppliers/suppliers-form', { data, action: `/suppliers/edit/${id}` })
    }).catch((err) => { console.log(err) })
}

const editDataSupplier = (req, res) => {
    const id = req.params.id
    const body = req.body
    Supplier.update(body,
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/suppliers')
        })
}

const deleteDataSupplier = (req, res) => {
    const id = req.params.id
    Supplier.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/suppliers')
    }).catch((err) => { console.log(err) })
}

const addItemtoSupplier = (req, res) => {
    // res.send('hello')
    const supplierId = req.params.supplierId

    Supplier.findById(supplierId).then((dataSupplier) => {
        SupplierItem.findAll({
            where: {
                supplierId: dataSupplier.id
            }, include: [Item]
        }).then((SupplierDataItem) => {
            Item.findAll().then((dataItem) => {
                // res.send(dataItem)
                res.render('supplierItems/supplier-items-form', { dataSupplier, SupplierDataItem, dataItem, currency: money })
            })
        })
    })
        .catch((err) => { console.log(err) })
}

const saveItemtoSupplier = (req, res) => {
    const supplierId = req.params.supplierId
    SupplierItem.create({
        itemId: req.body.itemId,
        price: req.body.price,
        supplierId: supplierId
    }).then(() => {
        res.redirect(`/suppliers/${supplierId}/additem`)
    }).catch((err) => { console.log(err) })
}

module.exports = {
    ShowAllSuppliers,
    SupplierForm,
    addSupplier,
    editSupplier,
    editDataSupplier,
    deleteDataSupplier,
    addItemtoSupplier,
    saveItemtoSupplier
}