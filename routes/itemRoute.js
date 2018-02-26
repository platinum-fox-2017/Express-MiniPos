const express = require('express')
const router = express.Router()
const ItemCRUD = require('../controller/index.js').ItemCRUD

router.get('/', ItemCRUD.itemPage)

router.get('/add', ItemCRUD.itemAddPage)
router.post('/add', ItemCRUD.itemAddPage)

router.get('/edit/:id', ItemCRUD.itemEditPage)
router.post('/edit/:id', ItemCRUD.itemEditPage)

router.get('/delete/:id', ItemCRUD.itemDeletePage)

module.exports = router;
