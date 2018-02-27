const express = require('express')
const router = express.Router()
const ItemController = require('../controller/index.js').ItemCRUD

router.get('/', ItemController.itemPage)

router.get('/add', ItemController.itemAddPage)
router.post('/add', ItemController.itemAddPagePost)

router.get('/edit/:id', ItemController.itemEditPage)
router.post('/edit/:id', ItemController.itemEditPagePost)

router.get('/delete/:id', ItemController.itemDeletePage)

module.exports = router;
