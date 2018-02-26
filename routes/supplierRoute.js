const express = require('express')
const router = express.Router()
const SupplierCRUD = require('../controller/index.js').SupplierCRUD

router.get('/', SupplierCRUD.supplierPage)

router.get('/add', SupplierCRUD.supplierAddPage)
router.post('/add', SupplierCRUD.supplierAddPage)

router.get('/edit/:id', SupplierCRUD.supplierEditPage)
router.post('/edit/:id', SupplierCRUD.supplierEditPage)

router.get('/delete/:id', SupplierCRUD.supplierDeletePage)

module.exports = router;
