const { Item } = require('../models')
const Op = require('sequelize').Op
const ShowAllItems = (req, res) => {
    Item.findAll().then((datas) => {
        res.render('items/items', { datas })
    }).catch((err) => { console.log(err) })
}

const ItemsForm = (req, res) => {
    const data = ''
    res.render('items/items-form', { action: '/items/add', data })
}

const addItems = (req, res) => {
    const data = ''
    const body = req.body
    Item.create(
        body
    ).then(() => {
        res.redirect('/items')
    }).catch((err) => {
        res.render('items/items-form', { action: '/items/add', data, err })
    })
}

const editItem = (req, res) => {
    const id = req.params.id
    Item.findById(id).then((data) => {
        // res.send(data)
        res.render('items/items-form', { action: `/items/edit/${id}`, data })
    })
}

const editDataItem = (req, res) => {
    const itemid = req.body.itemid
    // console.log(itemid)
    const id = req.params.id
    const body = req.body
    Item.findById(id).then((data) => {
        Item.update({
            id: id,
            name: body.name,
            brand: body.brand,
            codeitem: body.codeitem
        }, {
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect('/items')
            }).catch((err) => {
                res.render('items/items-form', { action: `/items/edit/${id}`, err, data })
            })
    })
}

const deleteDataItem = (req, res) => {
    const id = req.params.id
    Item.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/items')
    }).catch((err) => { console.log(err) })
}

module.exports = {
    ShowAllItems,
    ItemsForm,
    addItems,
    editItem,
    editDataItem,
    deleteDataItem
}