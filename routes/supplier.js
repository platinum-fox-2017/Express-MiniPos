'use strict';

const supplierController = require('../controllers').supplier;
const router = require('express').Router();

router.get('/', supplierController.showAll);
router.get('/add', supplierController.showAddForm);
router.post('/add', supplierController.addData);
router.get('/edit/:id', supplierController.showEditForm);
router.post('/edit/:id', supplierController.editData);
router.get('/delete/:id', supplierController.deleteData);
router.get('/:id/additem', supplierController.showAddItemForm);
router.post('/:id/additem', supplierController.addItemSupplier);

module.exports = router;