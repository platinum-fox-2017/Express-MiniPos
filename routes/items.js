const router = require('express').Router()
const ItemsController = require('../controllers/items')

router.get('/', ItemsController.ShowAllItems)
router.get('/add', ItemsController.ItemsForm)
router.post('/add', ItemsController.addItems)
router.get('/edit/:id', ItemsController.editItem)
router.post('/edit/:id', ItemsController.editDataItem)
router.get('/delete/:id', ItemsController.deleteDataItem)
module.exports = router