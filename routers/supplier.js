const express      = require('express')
const router       = express.Router()
const Model        = require('../models')
const Supplier     = Model.Supplier
const format       = require('../helpers/helper');

router.get('/', (req, res) => {
  Supplier.findAll({
    include: [ Model.Item ]
  })
  .then(suppliers => {
    // console.log(format(2000000));
    // res.send(suppliers)
    res.render('supplier',{ suppliers, format })
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/add', (req, res) => {
  let dataSupplier = {
    name: '',
    city: ''
  }
  res.render('supplier-form',{dataSupplier: dataSupplier, err: true, action: '/supplier/add'})
})

router.post('/add', (req, res) => {
  let objSupplier = req.body
  // console.log(objSupplier);
  Supplier.create(req.body)
  .then(() => {
    res.redirect('/supplier')
  })
  .catch(err => {
    let dataSupplier = {
      name: '',
      city: ''
    }
    res.render('supplier-form',{dataSupplier: dataSupplier, action: '/supplier/add'})
  })
})

router.get('/edit/:id', (req, res) => {
  let idInput = req.params.id
  Supplier.findById(idInput)
  .then(dataSupplier => {
    res.render('supplier-form',{dataSupplier, err: true, action: `/supplier/edit/${idInput}`})
  })
  .catch(err=> {
    console.log(err);
  })
})

router.post('/edit/:id', (req, res) => {
  let idInput = req.params.id
  let objSupplier = req.body
  Supplier.update(objSupplier, {
    where: {
      id: idInput
    }
  })
  .then(() => {
    res.redirect('/supplier')
  })
  .catch(err => {
    Supplier.findById(idInput)
    .then(dataSupplier => {
      res.render('supplier-form',{ dataSupplier, err, action: `/supplier/edit/${idInput}`});
    })
    .catch(err => {
      console.log(err);
    })
  })
})

router.get('/delete/:id', (req, res) => {
  let idInput = req.params.id
  Supplier.destroy({
    where: {id: idInput}
  })
  .then(() => {
    res.redirect('/supplier')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/:id/additem', (req,res) => {
  let idInput = req.params.id
  Model.Supplier_Item.findAll({
    include: [ Model.Item, Model.Supplier ],
    where: {
      supplierId: idInput
    }
  })
  .then(joinData => {
    Model.Item.findAll()
    .then(items => {
      res.render('assign-item',{ joinData, items })
      // res.send({joinData, items})
    })
  })
})

router.post('/:id/additem', (req, res) => {
  console.log('<<<<<<<<<<<< halo');
  let objInput = {
    supplierId: +req.params.id,
    itemId: +req.body.itemId,
    price: +req.body.price
  }
  console.log(objInput)
  Model.Supplier_Item.create(objInput)
  .then(() => {
    res.redirect('/supplier')
  })
})


module.exports = router;
