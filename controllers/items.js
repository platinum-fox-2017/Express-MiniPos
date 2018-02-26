const { Item } = require('../models')

const ShowAllItems = (req, res) => {
    Item.findAll().then((datas) => {
        res.render('items/items', { datas })
    }).catch((err) => { console.log(err) })
}

const ItemsForm = (req, res) => {
    let data = ''
    res.render('items/items-form', { action: '/items/add', data })
}

const addItems = (req, res) => {
    const body = req.body
    Item.create(
        body
    ).then(() => {
        res.redirect('/items')
    }).catch((err) => { console.log(err) })
}

const editItem = (req, res) => {
    const id = req.params.id
    Item.findById(id).then((data) => [
        res.render('items/items-form', { action: `/items/edit/${id}`, data })
    ])
}

const editDataItem = (req, res) => {
    const id = req.params.id
    const body = req.body
    Item.update(body, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/items')
    }).catch((err) => { console.log(err) })
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