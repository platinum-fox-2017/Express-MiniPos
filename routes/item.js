'use strict';

const itemController = require('../controllers').item;
const router = require('express').Router();

router.get('/', itemController.showAll);
router.get('/add', itemController.showAddForm);
router.post('/add', itemController.addData);
router.get('/edit/:id', itemController.showEditForm);
router.post('/edit/:id', itemController.editData);
router.get('/delete/:id', itemController.deleteData);

module.exports = router;