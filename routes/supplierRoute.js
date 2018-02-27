const express = require('express')
const router = express.Router()
const SupplierController = require('../controller/index.js').SupplierCRUD

router.get('/', SupplierController.supplierPage)

router.get('/add', SupplierController.supplierAddPage)
router.post('/add', SupplierController.supplierAddPagePost)

router.get('/edit/:id', SupplierController.supplierEditPage)
router.post('/edit/:id', SupplierController.supplierEditPagePost)

router.get('/additem/:id', SupplierController.supplierAddItem)
router.post('/additem/:id', SupplierController.supplierAddItemPost)

router.get('/delete/:id', SupplierController.supplierDeletePage)

module.exports = router;
