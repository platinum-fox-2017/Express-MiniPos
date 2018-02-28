const router = require('express').Router()
const SupplierControllers = require('../controllers/suppliers')

router.get('/', SupplierControllers.ShowAllSuppliers)
router.get('/add', SupplierControllers.SupplierForm)
router.post('/add', SupplierControllers.addSupplier)
router.get('/edit/:id', SupplierControllers.editSupplier)
router.post('/edit/:id', SupplierControllers.editDataSupplier)
router.get('/delete/:id', SupplierControllers.deleteDataSupplier)
router.get('/:supplierId/additem', SupplierControllers.addItemtoSupplier)
router.post('/:supplierId/additem', SupplierControllers.saveItemtoSupplier)
module.exports = router

