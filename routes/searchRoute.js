const express = require('express')
const router = express.Router()
const SearchController = require('../controller/index.js').SearchController

router.get('/', SearchController.searchPage)

router.post('/', SearchController.searchPageResult)

module.exports = router;
