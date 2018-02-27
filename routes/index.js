const router = require('express').Router();
const routerItem = require('./item.js');
const routerSupplier = require('./supplier.js');
const routerSearch = require('./search.js');

router.get('/', (req,res) => {
    res.render('index');
});

router.use('/items',routerItem);
router.use('/suppliers',routerSupplier);
router.use('/search',routerSearch);

module.exports = router;
