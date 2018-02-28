const express     = require('express')
const router      = express.Router()
const Model       = require('../models')
const Item        = Model.Item
const format      = require('../helpers/helper')


router.get('/', (req, res) => {
  Item.findAll({
    include: [ Model.Supplier ]
  })
  .then(items => {
    // res.send(items)
    res.render('item',{ items , format })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/add', (req, res) => {
  let dataItem = {
    name: '',
    brand: '',
    codeItem: ''
  }
  res.render('item-form',{dataItem, error: null, action: '/item/add'})
})

router.post('/add', (req, res) => {
  let objItem = req.body
  Item.create(req.body)
  .then(() => {
    res.redirect('/item')
  })
  .catch(err => {
    let dataItem = {
      name: '',
      brand: '',
      codeItem: ''
    };
    res.render('item-form',{ dataItem, error: err.errors[0].message, action: '/item/add'});
  })
})

router.get('/edit/:id', (req, res) => {
  let idInput = req.params.id
  Item.findById(idInput)
  .then(dataItem => {
    res.render('item-form',{dataItem, error:null, action: `/item/edit/${idInput}`})
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/edit/:id', (req, res) => {
  let idInput = req.params.id
  let objItem = req.body
  Item.update(objItem, {
    where: {
      id: idInput
    }
  })
  .then(() => {
    res.redirect('/item')
  })
  .catch(err => {
    Item.findById(idInput)
    .then(dataItem => {
      res.render('item-form',{ dataItem, error:err.errors[0].message, action:`/item/edit/${idInput}`});
    })
    .catch(err => {
      console.log(err);
    })
  })
})

router.get('/delete/:id', (req, res) => {
  let idInput = req.params.id
  Item.destroy({
    where: {id: idInput}
  })
  .then(() => {
    res.redirect('/item')
  })
  .catch(err => {
    console.log(err);
  })
})


module.exports = router;
