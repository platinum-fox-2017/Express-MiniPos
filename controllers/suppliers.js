const { Supplier } = require('../models')

const ShowAllSuppliers = (req, res) => {
    Supplier.findAll().then((datas) => {
        // res.send(datas)
        res.render('suppliers/suppliers', { datas })
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

module.exports = {
    ShowAllSuppliers,
    SupplierForm,
    addSupplier,
    editSupplier,
    editDataSupplier,
    deleteDataSupplier
}