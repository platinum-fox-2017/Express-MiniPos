'use strict';

const searchController = require('../controllers').search;
const router = require('express').Router();

router.get('/', searchController.searchItem);

module.exports = router;